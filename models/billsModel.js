const mongoose = require("mongoose");
const Sequence = require("./sequenceModel");

const billSchema = mongoose.Schema(
  {
    customerName: {
      type: String,
      required: [true, "Customer name is required"],
    },
    customerNumber: {
      type: String,
      required: [true, "Customer number is required"],
    },
    saleNumber: {
      type: Number,
      required: [false, "Sale number is required"],
      unique: true,
    },
    subTotal: {
      type: Number,
      required: [true, "SubTotal amount is required"],
    },
    totalAmount: {
      type: Number,
      required: [true, "Total amount is required"],
    },
    CGST: {
      type: Number,
      required: [true, "CGST is required"],
    },
    SGST: {
      type: Number,
      required: [true, "SGST is required"],
    },
    discount: {
      type: Number,
      required: [false, "Discount is required"],
    },
    paymentMode: {
      type: String,
      required: [true, "Payment mode is required"],
    },
    cartItems: {
      type: Array,
      required: [true, "Cart items are required"],
    },
    date: {
      type: Date,
      default: Date.now(),
    }
    
  }
);


billSchema.pre("save", async function (next) {
  try {
    if (!this.saleNumber) {
      this.saleNumber = await Sequence.getNextSequence("saleNumber");
    }
    next();
  } catch (error) {
    next(error);
  }
});

const Bills = mongoose.model("bills", billSchema);

module.exports = Bills;
