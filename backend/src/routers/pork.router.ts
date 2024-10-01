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

router.post('/', asynceHandler(
    async (req, res) => {
        const newPork = new PorkModel({
            name: req.body.name,
            price: req.body.price,
            tags: req.body.tags,
            favorite: req.body.favorite,
            stars: req.body.stars,
            imageUrl: req.body.imageUrl,
            kilo: req.body.kilo,
        });

        const createdPork = await newPork.save();
        res.status(201).send(createdPork);
    }
));
router.put('/:porkId', asynceHandler(
    async (req, res) => {
        const porkId = req.params.porkId;
        const pork = await PorkModel.findById(porkId);

        if (pork) {
            pork.name = req.body.name || pork.name;
            pork.price = req.body.price || pork.price;
            pork.tags = req.body.tags || pork.tags;
            pork.favorite = req.body.favorite || pork.favorite;
            pork.stars = req.body.stars || pork.stars;
            pork.imageUrl = req.body.imageUrl || pork.imageUrl;
            pork.kilo = req.body.kilo || pork.kilo;

            const updatedPork = await pork.save();
            res.send(updatedPork);
        } else {
            res.status(404).send({ message: "Pork not found" });
        }
    }
));
router.delete('/:porkId', asynceHandler(
    async (req, res) => {
        const porkId = req.params.porkId;
        const pork = await PorkModel.findByIdAndDelete(porkId);

        if (pork) {
            res.send({ message: 'Pork deleted successfully' });
        } else {
            res.status(404).send({ message: 'Pork not found' });
        }
    }
));











export default router;