import { Component } from 'react';
import styles from './imageGallery.module.css';

class ImageGallery extends Component {
  render() {
    return <ul className={styles.imageGallery}>{this.props.children}</ul>;
  }
}

export default ImageGallery;