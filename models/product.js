const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    model: {
      type: String,
      required: [true, "Please provide a name for this product.*"],
      trim: true,
      unique: [true, "Model must be unique"],
      minLength: [3, "Model must be at least 3 characters"],
      maxLength: [100, "Model is too large"],
    },
    image: {
      type: String,
      required: true,
    },
    keyFeature: {
      type: [String],
      required: true,
    },

    price: {
      type: Number,
      required: true,
      min: [0, "Price can't be negative"],
    },
    // unit: {
    //   type: String,
    //   required: true,
    //   enum: {
    //     values: ["kg", "litre", "pcs"],
    //     message: "Unit value can't be {VALUE}, must be kg/litre/pcs",
    //   },
    // },
    rating: {
      type: Number,
      required: true,
      min: [0, "Quantity can't be negative"],
      validate: {
        validator: (value) => {
          const isInteger = Number.isInteger(value);
          if (isInteger) {
            return true;
          } else {
            return false;
          }
        },

        message: "Rating must be an integer",
      },
    },

    status: {
      type: String,
      enum: {
        values: ["in-stock", "out-of-stock,discontinued"],
        message: "Status can't be {VALUE}",
      },
    },
    // supplier: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: `Supplier`,
    // },
    category: {
      type: String,
      required: true,
    },
    // categories: [
    //   {
    //     name: {
    //       type: String,
    //       required: true,
    //     },
    //     _id: mongoose.Schema.Types.ObjectId,
    //   },
    // ],
    spec: [
      {
        processor: {
          type: String,
        },
      },
      {
        motherboard: {
          type: String,
        },
      },
      {
        ram: {
          type: String,
        },
      },
      {
        graphics: {
          type: String,
        },
      },
      {
        storage: {
          type: String,
        },
      },
      {
        casing: {
          type: String,
        },
      },
      {
        psu: {
          type: String,
        },
      },
      {
        cooler: {
          type: String,
        },
      },
    ],

    // createdAt: {
    //   type: Date,
    //   default: Date.now,
    // },
    // updatedAt: {
    //   type: Date,
    //   default: Date.now,
    // },
  },
  {
    timestamps: true,
  }
);
// mongoose middlewares for saving data: pre/post

productSchema.pre("save", function (next) {
  console.log("Before saving data");

  // this =>
  if (this.quantity == 0) {
    this.status = "out-of-stock";
  }
  next();
});

productSchema.post("save", function (doc, next) {
  console.log("After saving data");
  next();
});

productSchema.methods.logger = function () {
  console.log(`Data saved for ${this.name}`);
};

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
