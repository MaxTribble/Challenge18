const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
} = require('../../controllers/thoughtController');

// /api/applications
router.route('/').get(getThoughts).post(createThought);

router
  .route('/:applicationId')
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

router.route('/:applicationId/tags').post(addReaction);

router.route('/:applicationId/tags/:tagId').delete(removeReaction);

module.exports = router;