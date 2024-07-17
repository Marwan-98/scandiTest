import React, { Component } from "react";
import ProductImage from "../ProductListItem/image.png";
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

    const wrappedIndex = newIndex > 5 ? 0 : newIndex < 0 ? 5 : newIndex;

    this.setState({ currentImageIdx: wrappedIndex });
  }

  setCurrentImageIndex(index) {
    this.setState({ currentImageIdx: index });
  }

  componentDidUpdate() {
    console.log(this.props);
  }

  render() {
    return (
      <div className="ProductGallery-Images">
        <div className="ProductGallery-ImagesList">
          {Array.from({ length: 5 }).map((_, idx) => (
            <div key={idx} onClick={() => this.setCurrentImageIndex(idx)}>
              <img className="ProductGallery-ImagesBoxes" src={ProductImage} alt="product slide" />
            </div>
          ))}
        </div>
        <div className="ProductGallery-ImagesSlider">
          <button className="ProductGallery-ImagesSliderChevron" onClick={() => this.updateCurrentImageIndex(-1)}>
            <ChevronIcon className="ProductGallery-ImagesSliderChevron-Right" />
          </button>
          <img className="ProductGallery-ImagesMain" src={ProductImage} alt="current slid" />
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
