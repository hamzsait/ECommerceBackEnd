const router = require('express').Router();
const { Category, Product } = require('../../models');

router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll();
    res.status(200).json(categoryData);
  }
  catch (err) {
    res.status(400).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
  const categoryData = await Category.findByPk(req.params.id);
  res.status(200).json(categoryData);
  }
  catch (err){
    res.status(400).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const newCategory = await Category.create({
      category_name: req.body.category_name,
    })
    res.status(200).json(newCategory)
  }
  catch {
    res.status(400).json(err)
  }
});

router.put('/:id', async (req, res) => {
  try{
    const Updatedcategory = await Category.update(req.body, {
      where: {
        id:req.params.id
      },
      category_name: req.body.category_name,
    })
    if (!Updatedcategory[0]) {
      res.status(404).json({ message: 'No user with this id!' });
      return;
    }
    res.status(200).json(await Category.findByPk(req.params.id));
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try{
    const deletedCategory = await Category.destroy({
      where: {
        id:req.params.id
      },
    })

    if (!deletedCategory) {
      res.status(404).json({ message: 'No library card found with that id!' });
      return;
    }
    res.status(200).json(await Category.findAll());
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
