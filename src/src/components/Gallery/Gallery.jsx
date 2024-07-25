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
    const { currentImageIdx } = this.state;
    const { gallery } = this.props;
    const currentIndex = currentImageIdx;
    const newIndex = currentIndex + amount;

    const wrappedIndex = newIndex > gallery.length - 1 ? 0 : newIndex < 0 ? gallery.length - 1 : newIndex;

    this.setState({ currentImageIdx: wrappedIndex });
  }

  setCurrentImageIndex(index) {
    this.setState({ currentImageIdx: index });
  }

  render() {
    const { currentImageIdx } = this.state;
    const { gallery } = this.props;

    return (
      <div className="ProductGallery-Images">
        <div className="ProductGallery-ImagesList">
          {gallery?.map((url, idx) => (
            <div key={idx} onClick={() => this.setCurrentImageIndex(idx)}>
              <div
                className="ProductGallery-ImagesBoxes"
                style={{ backgroundImage: `url(${url})` }}
                alt="product slide"
              />
            </div>
          ))}
        </div>
        <div className="ProductGallery-ImagesSlider">
          <button className="ProductGallery-ImagesSliderChevron" onClick={() => this.updateCurrentImageIndex(-1)}>
            <ChevronIcon className="ProductGallery-ImagesSliderChevron-Right" />
          </button>
          <div
            className="ProductGallery-ImagesMain"
            style={{
              backgroundImage: `url(${gallery ? gallery[currentImageIdx] : ""})`,
            }}
            alt="current slide"
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
