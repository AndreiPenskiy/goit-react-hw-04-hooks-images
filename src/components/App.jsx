import React, { Component } from "react";
import axios from "axios";
import Searchbar from "./Searchbar/Searchbar";
import { ToastContainer, toast } from 'react-toastify';
import { ImageGallery } from "./ImageGallery/ImageGallery";
import LoadMoreBtn from "./Button/LoadMoreBtn";
import LoaderImg from "./Loader/Loader";
import Modal from "./Modal/Modal";


axios.defaults.baseURL = 'https://pixabay.com/api';

class App extends Component {

  state = {
    searchItem: '',
    items: [],
    status: 'idle',
    page: 1,
    showModal: false,
    imageModal: null,
  };

  async componentDidUpdate(prevProps, prevState) {
    const prevSearch = prevState.searchItem;
    const newSearch = this.state.searchItem;
    const prevPage = prevState.page;
    const newPage = this.state.page;

    if (prevSearch !== newSearch || prevPage !== newPage) {
      this.setState({ status: 'pending' });
      if (prevSearch !== newSearch)  {
            this.setState({page: 1})
          }
  
      try {
        const response = await axios.get(`/?q=${newSearch}&page=${newPage}&key=24558564-a16a5722e1280d44cb84f27e6&image_type=photo&orientation=horizontal&per_page=12`);
        //console.log(response.data);
        const currentItems = response.data.hits.map(({ id, webformatURL, largeImageURL, tags }) => {
          return { id, webformatURL, largeImageURL, tags };
        });
        this.setState((prevState) => ({
          items: [...prevState.items, ...currentItems], status: 'resolved',
        }));
        if (response.data.hits.length === 0) {
          toast.error('Неправильный запрос, давай по новой!', { position: "top-center", });
        }
      } catch (error) {
        toast.error('Все пропало!', { position: "top-center", });
        this.setState({ status: 'rejected' });
      }
    };
  }; 

  handleFormSubmit = searchItem => {
    this.setState({ searchItem, items: [] });
  }

  ClickLoadBtn = () => {
    this.setState((prevState) => ({
      page: prevState.page + 1,
    }));
  };

  toggleModal = largeImageURL => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
    this.setState({ imageModal: largeImageURL });
  };


  render() {
    const { items, status, showModal, imageModal} = this.state;

    return (
    <>
        <Searchbar onSubmit={this.handleFormSubmit} />
        {items.length > 0 && <ImageGallery pictures={items} onClick={this.toggleModal} />}
        {status === 'pending' && <LoaderImg />}
        {(items.length === 12 || items.length > 12) && <LoadMoreBtn onClick={this.ClickLoadBtn} />}
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={imageModal} alt="" />
          </Modal>
        )}
        <ToastContainer autoClose={2000} />
    </>
  );
  }
};

export default App;