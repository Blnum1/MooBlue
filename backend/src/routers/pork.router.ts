import {Router} from 'express';
import { sample_Porks, sample_tags } from '../data';
import asynceHandler from 'express-async-handler';
import { PorkModel } from '../models/pork.model';
const router = Router();

router.get("/seed", asynceHandler(
    async (req,res) => {
        const porksCount = await PorkModel.countDocuments();
        if(porksCount> 0){
        res.send("Seed is already done!");
        return;
    }

    await PorkModel.create(sample_Porks);
    res.send("Seed Is Done!");
})
);

router.get('/',asynceHandler(
    async (req, res) => {
      const porks = await PorkModel.find();
        res.send(porks);
    })
  );

router.get("/search/:serchTerm", asynceHandler(
    async(req, res) => {
    const searchRegex = new RegExp(req.params.serchTerm, 'i');
    const porks = await PorkModel.find({name: {$regex:searchRegex}})
    res.send(porks);
    }
))

router.get("/tags", asynceHandler(
    async(req, res) => {
        const tags = await PorkModel.aggregate([
            {
                $unwind:'$tags'
            },
            {
                $group:{
                    _id: '$tags',
                    count: {$sum: 1}
                }
            },
            {
                $project:{
                    _id: 0,
                    name:'$_id',
                    count: 'count'
                }
            }
        ]).sort({count: -1});

        const all = {
            name : 'All',
            count: await PorkModel.countDocuments()
        }

        tags.unshift(all);
        res.send(tags);
    }
))

router.get("/tag/:tagName", asynceHandler(
    async (req, res) => {
        const porks = await PorkModel.find({tags: req.params.tagName})
        res.send(porks);
}
))

router.get("/:porkId",asynceHandler(
    async (req, res) => {
    const pork = await PorkModel.findById(req.params.porkId);
    res.send(pork);
})
);

export default router;