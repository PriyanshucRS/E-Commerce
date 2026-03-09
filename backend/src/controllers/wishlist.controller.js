const WatchList = require('../models/watchList')

exports.addWatchList = async(req,res) =>{
    try{
          const watchList = new WatchList(req.body);
          const saveCart = await watchList.save()
          res.status(201).json(saveCart)

    }catch(err){
        res.status(500).json({message : err.meassage})

    }
}