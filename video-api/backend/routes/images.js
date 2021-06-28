const express = require('express');
const imageRouter = express.Router();
const mongoose = require('mongoose');
const Image = require('../models/image')
var Grid = require('gridfs-stream')
var fs = require('fs')
var path = require('path');
const mongodb = require('mongodb');
require('dotenv').config();



module.exports = (upload) => {
    const url = process.env.ATLAS_URI;
    const connect = mongoose.createConnection(url, { useNewUrlParser: true, useUnifiedTopology: true });
    
    mongoose.connect(url, { useNewUrlParser: true, useCreateIndex: true }
        );
    const connection = mongoose.connection;

    let gfs;
    let gfs1;
    let gfs2;
    Grid.mongo = mongoose.mongo;

    connect.once('open', () => {
        // initialize stream
        gfs = new mongoose.mongo.GridFSBucket(connect.db, {
            bucketName: "uploads"
        });
        gfs1 = new mongoose.mongo.GridFSBucket(connect.db, {
            bucketName: "fs"
        });
        gfs2 = Grid(connection.db);
    });

    /*
        POST: Upload a single image/file to Image collection
    */
    imageRouter.route('/')
        .post(upload.single('file'), (req, res, next) => {
            console.log(req.body);
            // check for existing images
            Image.findOne({ caption: req.body.caption })
                .then((image) => {
                    console.log(image);
                    if (image) {
                        return res.status(200).json({
                            success: false,
                            message: 'Image already exists',
                        });
                    }

                    let newImage = new Image({
                        caption: req.body.caption,
                        filename: req.file.filename,
                        fileId: req.file.id,
                    });

                    newImage.save()
                        .then((image) => {

                            res.status(200).json({
                                success: true,
                                image,
                            });
                        })
                        .catch(err => res.status(500).json(err));
                })
                .catch(err => res.status(500).json(err));
        })
        .get((req, res, next) => {
            Image.find({})
                .then(images => {
                    res.status(200).json({
                        success: true,
                        images,
                    });
                })
                .catch(err => res.status(500).json(err));
        });

    /*
        GET: Delete an image from the collection
    */
    imageRouter.route('/delete/:id')
        .get((req, res, next) => {
            Image.findOne({ _id: req.params.id })
                .then((image) => {
                    if (image) {
                        Image.deleteOne({ _id: req.params.id })
                            .then(() => {
                                return res.status(200).json({
                                    success: true,
                                    message: `File with ID: ${req.params.id} deleted`,
                                });
                            })
                            .catch(err => { return res.status(500).json(err) });
                    } else {
                        res.status(200).json({
                            success: false,
                            message: `File with ID: ${req.params.id} not found`,
                        });
                    }
                })
                .catch(err => res.status(500).json(err));
        });

    /*
        GET: Fetch most recently added record
    */
    imageRouter.route('/recent')
        .get((req, res, next) => {
            Image.findOne({}, {}, { sort: { '_id': -1 } })
                .then((image) => {
                    res.status(200).json({
                        success: true,
                        image,
                    });
                })
                .catch(err => res.status(500).json(err));
        });

    /*
        POST: Upload multiple files upto 3
    */
    imageRouter.route('/multiple')
        .post(upload.array('file', 3), (req, res, next) => {
            res.status(200).json({
                success: true,
                message: `${req.files.length} files uploaded successfully`,
            });
        });

    /*
        GET: Fetches all the files in the uploads collection
    */
    imageRouter.route('/files')
        .get((req, res, next) => {
            gfs.find().toArray((err, files) => {
                if (!files || files.length === 0) {
                    return res.status(200).json({
                        success: false,
                        message: 'No files available'
                    });
                }

                files.map(file => {
                    if (file.contentType === 'image/jpeg' || file.contentType === 'image/png' || file.contentType === 'image/svg') {
                        file.isImage = true;
                    } else {
                        file.isImage = false;
                    }
                });

                res.status(200).json({
                    success: true,
                    files,
                });
            });
        });

    /*
        GET: Fetches a particular file by filename
    */
    imageRouter.route('/file/:filename')
        .get((req, res, next) => {
            console.log("in routes "+ req.params.filename);
            gfs1.find({ filename: req.params.filename }).toArray((err, files) => {
                //console.log('name before condition '+req.params.filename);
                var name = req.params.filename
                if (!files[0] || files.length === 0) {
                    
                    return res.status(200).json({
                        success: false,
                        message: 'ppm'+req.params.filename+'.mp4',
                    });
                }
                // console.log("name "+name);
                //     var fs_write_stream = fs.createWriteStream(path.join(__dirname,'../../src/writeTo/'+name));
                //     var readstream = gfs2.createReadStream({
                //         filename:name
                //     });
                //     readstream.pipe(fs_write_stream);
                //     console.log(("in route"));
                //     //console.log(readstream);
                //     fs_write_stream.on('close',function(){
                //         console.log(name+" file has been written fully");
                //     })
                res.status(200).json({
                    
                    success: true,
                    file: files[0],
                });
            });
        });

    /* 
        GET: Fetches a particular image and render on browser
    */
    // imageRouter.route('/image/:filename')
    //     .get((req, res, next) => {
    //         gfs.find({ filename: req.params.filename }).toArray((err, files) => {
    //             if (!files[0] || files.length === 0) {
    //                 return res.status(200).json({
    //                     success: false,
    //                     message: 'No files available',
    //                 });
    //             }

    //             if (files[0].contentType === 'image/jpeg' || files[0].contentType === 'image/png' || files[0].contentType === 'image/svg+xml') {
    //                 // render image to browser
    //                 gfs.openDownloadStreamByName(req.params.filename).pipe(res);
    //             } else {
    //                 res.status(404).json({
    //                     err: 'Not an image',
    //                 });
    //             }
    //         });
    //     });
    imageRouter.route('/video/:filename')
        .post(upload.single('file'), (req, res, next) => {
            console.log("coming in post route");
            console.log(req.body);
            // check for existing images
            // gfs1.findOne({filename: req.params.filename })
            //     .then((video) => {
            //         console.log(video);
            //         if (video) {
            //             return res.status(200).json({
            //                 success: false,
            //                 message: 'video already exists',
            //             });
            //         }
            //         req.pipe(gfs1.createWriteStream({
            //             filename: req.params.filename
            //           }));
            //         res.send("Success!");
            //     })
            //     .catch(err => res.status(500).json(err));
        })
        .get((req, res, next) => {
            //console.log("bunny "+req.params.filename);
            gfs1.find({ filename: req.params.filename }).toArray((err, files) => {
                //console.log("bunny 4 "+req.params.filename);

                const range = req.headers.range;
                console.log("range "+range);
                if (!files[0] || files.length === 0) {
                   // console.log("bunny 3 "+req.params.filename);
                    return res.status(200).json({
                        success: false,
                        message: 'No files available',
                    });
                }

                if (files[0].contentType ==='binary/octet-stream' || files[0].contentType === 'video/mp4' ||  files[0].contentType === 'video/avi') {
                    // render video to browser

                    gfs1.openDownloadStreamByName(req.params.filename).pipe(res);

                } else {
                    //console.log("bunny 2 "+req.params.filename);
                    res.status(400).json({
                        err: 'Not a video',
                    });
                }
            });
        });

    imageRouter.route('/videos/:filename')
        .get((req, res, next) => {
            mongodb.MongoClient.connect(url, function (error, client) {
                if (error) {
                  res.status(500).json(error);
                  return;
                }
            
                // Check for range headers to find our start time
                const range = req.headers.range;
                if (!range) {
                  res.status(400).send("Requires Range header");
                }
            
                const db = client.db('myFirstDataBase');
                // GridFS Collection
                gfs1.find({ filename: req.params.filename }).toArray((err, files) => {
                
                var video = files[0]
                  if (!video) {
                    //res.status(404).send("No video uploaded!");
                    console.log("Not Video");
                    return;
                  }
            
                  // Create response headers
                  const videoSize = video.length;
                  const start = Number(range.replace(/\D/g, ""));
                  const end = videoSize - 1;
            
                  const contentLength = end - start + 1;
                  const headers = {
                    "Content-Range": `bytes ${start}-${end}/${videoSize}`,
                    "Accept-Ranges": "bytes",
                    "Content-Length": contentLength,
                    "Content-Type": "video/mp4",
                  };
                  console.log("in videos/filename "+videoSize+" "+start+" "+end+" "+contentLength);
                  // HTTP Status 206 for Partial Content
                  res.writeHead(206, headers);
            
                  // Get the bucket and download stream from GridFS
                  const bucket = new mongodb.GridFSBucket(db);
                  var name  = req.params.filename
                  var res = name.split('.')
                  var final = res[0]
                  console.log(final);
                  const downloadStream = bucket.openDownloadStreamByName(final, {
                    start
                  });
            
                  // Finally pipe video to response
                  downloadStream.pipe(res);
                }); 
        });
    });

    imageRouter.route('/image/:filename')
        .get((req, res, next) => {
            //console.log("in image/filename "+req.params.filename);
            gfs.find({ filename: req.params.filename }).toArray((err, files) => {
                if (!files[0] || files.length === 0) {
                    return res.status(200).json({
                        success: false,
                        message: 'No files available',
                    });
                }

                if (files[0].contentType === 'image/jpeg' || files[0].contentType === 'image/png' || files[0].contentType === 'image/svg+xml') {
                    // render image to browser
                    gfs.openDownloadStreamByName(req.params.filename).pipe(res);
                } else {
                    res.status(404).json({
                        err: 'Not an image',
                    });
                }
            });
        });

    /*
        DELETE: Delete a particular file by an ID
    */
    imageRouter.route('/file/del/:id')
        .post((req, res, next) => {
            console.log(req.params.id);
            gfs.delete(new mongoose.Types.ObjectId(req.params.id), (err, data) => {
                if (err) {
                    return res.status(404).json({ err: err });
                }

                res.status(200).json({
                    success: true,
                    message: `File with ID ${req.params.id} is deleted`,
                });
            });
        });

    return imageRouter;
};