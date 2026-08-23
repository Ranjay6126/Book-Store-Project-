import mongoose from "mongoose";

const bookSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: String,
      required: true,
      trim: true,
    },
    publishYear: {
      type: Number,
      required: true,
    },

    /* ---- optional descriptive fields ---- */

    // Short blurb shown on cards and in the preview header.
    description: {
      type: String,
      default: "",
      trim: true,
      maxlength: 1000,
    },

    // The long-form story / synopsis (roughly 1–2 pages of prose).
    story: {
      type: String,
      default: "",
      maxlength: 20000,
    },

    // Cover art. Either a remote URL or a base64 data URL produced by the
    // browser after client-side resizing.
    coverImage: {
      type: String,
      default: "",
    },

    genre: {
      type: String,
      default: "",
      trim: true,
      maxlength: 60,
    },

    pages: {
      type: Number,
      default: null,
      min: 1,
      max: 20000,
    },
  },
  {
    timestamps: true,
  }
);

export const Book = mongoose.model("Book", bookSchema);
