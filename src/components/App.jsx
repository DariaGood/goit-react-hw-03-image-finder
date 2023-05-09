import React, { Component } from 'react';
import axios from 'axios';
import Notiflix from 'notiflix';
import { BASE_URL, API_KEY, SEARCH_PARAMS } from './../api/server';
import Searchbar from './searchbar/Searchbar';
import LoadMore from './loadMore/LoadMore';
import ImageGallery from './imageGallery/ImageGallery.jsx';
import ImageGalleryItem from './imageGalleryItem/ImageGalleryItem';
import Modal from './modal/Modal';
import Loader from './loader/Loader';

export class App extends Component {
  state = {
    hits: [],
    name: '',
    page: 1,
    showModal: false,
    isLoading: false,
    largeImageURL: '',
    tags: '',
  };

  switchStatusModal = (imageURL, tag) => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      largeImageURL: imageURL,
      tags: tag,
    }));
  };

  getData = ({ name, page }) => {
    this.setState({ isLoading: true });
    try {
      axios
        .get(
          `${BASE_URL}?key=${API_KEY}&q=${name}&page=${page}&${SEARCH_PARAMS}`
        )
        .then(response => {
          if (!response.data.hits.length) {
            Notiflix.Notify.failure('No images found!');
          } else if (name === this.state.name) {
            this.setState(state => ({
              hits: [...state.hits, ...response.data.hits],
              name: name,
              page: state.page + 1,
            }));
          } else {
            this.setState(state => ({
              hits: response.data.hits,
              name: name,
              page: state.page + 1,
            }));
          }
        });
    } catch (error) {
      console.error(error.message);
    } finally {
      this.setState({
        isLoading: false,
      });
    }
  };

  loadMore = () => {
    this.getData(this.state);
  };

  render() {
    const { hits, showModal, isLoading, largeImageURL, tags } = this.state;

    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gridGap: '16px',
          paddingBottom: '24px',
        }}
      >
        <Searchbar onSubmitHandler={this.getData} />

        {isLoading && <Loader />}

        {hits && (
          <ImageGallery>
            <ImageGalleryItem
              articles={hits}
              onImage={this.switchStatusModal}
            />
          </ImageGallery>
        )}

        {showModal && (
          <Modal
            onClose={this.switchStatusModal}
            url={largeImageURL}
            alt={tags}
          />
        )}

        {hits.length > 0 && <LoadMore onButtonClick={() => this.loadMore()} />}
      </div>
    );
  }
}
