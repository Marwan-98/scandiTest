import React, { Component } from "react";
import ChevronIcon from "../ChevronIcon/ChevronIcon";
import "./Gallery.style.scss";

export class Gallery extends Component {
  constructor() {
    super();
    this.state = {
      currentImageIdx: 0,
    };
  }

  updateCurrentImageIndex(amount) {
    const currentIndex = this.state.currentImageIdx;
    const newIndex = currentIndex + amount;

    const wrappedIndex =
      newIndex > this.props.gallery.length - 1 ? 0 : newIndex < 0 ? this.props.gallery.length - 1 : newIndex;

    this.setState({ currentImageIdx: wrappedIndex });
  }

  setCurrentImageIndex(index) {
    this.setState({ currentImageIdx: index });
  }

  render() {
    return (
      <div className="ProductGallery-Images">
        <div className="ProductGallery-ImagesList">
          {this.props.gallery?.map((url, idx) => (
            <div key={idx} onClick={() => this.setCurrentImageIndex(idx)}>
              <img className="ProductGallery-ImagesBoxes" src={url} alt="product slide" />
            </div>
          ))}
        </div>
        <div className="ProductGallery-ImagesSlider">
          <button className="ProductGallery-ImagesSliderChevron" onClick={() => this.updateCurrentImageIndex(-1)}>
            <ChevronIcon className="ProductGallery-ImagesSliderChevron-Right" />
          </button>
          <img
            className="ProductGallery-ImagesMain"
            src={this.props.gallery ? this.props.gallery[this.state.currentImageIdx] : ""}
            alt="current slid"
          />
          <button
            className="ProductGallery-ImagesSliderChevron ProductGallery-ImagesSliderChevron-Right"
            onClick={() => this.updateCurrentImageIndex(1)}
          >
            <ChevronIcon rotate={180} className="ProductGallery-ImagesSliderChevron-Left" />
          </button>
        </div>
      </div>
    );
  }
}

export default Gallery;
