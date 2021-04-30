const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try{
    const tagData = await Tag.findAll({
      include: [{ model: Product, through: ProductTag, as: 'duct' }],
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id,{
      include: [{model:Product, through: ProductTag, as: 'duct'}]
    })
    res.status(200).json(tagData)
  }
  catch (err){
    res.status(500).json(err)
  }
});

router.post('/', async (req, res) => {
  try{
    await Tag.create(req.body);
    res.status(200).json(await Tag.findAll())
  } catch (err) {
    res.status(500).json(err)
  }
});

router.put('/:id', async (req, res) => {
  try{
    const tagData = await Tag.update(req.body, {
      where:{
        id:req.params.id
      }
    })
    if(!tagData[0]){
      res.json(404).json({message: 'No tag with this ID'})
      return
    }
    res.status(200).json(tagData)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.delete('/:id', async (req, res) => {
  try{
    const tagData = await Tag.destroy({
      where:{
        id:req.params.id
      }
    })
    if (!tagData){
      return res.status(400).json({message:"No tag with this ID!"})
    }
    res.status(200).json(tagData)
  }
  catch (err){
    res.status(500).json(err )
  }
});

module.exports = router;
