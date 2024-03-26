const mongoose = require('mongoose');


const sequenceSchema = mongoose.Schema({
    name: { type: String, required: true, unique: true },
    value: { type: Number, default: 0 }
  });
  
  sequenceSchema.statics.getNextSequence = async function(name) {
    const sequence = await this.findOneAndUpdate({ name: name }, { $inc: { value: 1 } }, { upsert: true, new: true });
    return sequence.value;
  };
  
  const Sequence = mongoose.model("Sequence", sequenceSchema);
  
  module.exports = Sequence;
  