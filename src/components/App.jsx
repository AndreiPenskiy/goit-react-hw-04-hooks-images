import React, { useState, useEffect } from "react";
import axios from "axios";
import Searchbar from "./Searchbar/Searchbar";
import { ToastContainer, toast } from 'react-toastify';
import { ImageGallery } from "./ImageGallery/ImageGallery";
import LoadMoreBtn from "./Button/LoadMoreBtn";
import LoaderImg from "./Loader/Loader";
import Modal from "./Modal/Modal";


axios.defaults.baseURL = 'https://pixabay.com/api';

export default function App() {

  const [searchItem, setSearchItem] = useState('');
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState('idle');
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [imageModal, setImageModal] = useState(null);


  useEffect(() => {
    if (searchItem === '') {
      return;
    }
    
    async function fetchPictures() {
      setStatus('pending');

      try {
      const response = await axios.get(`/?q=${searchItem}&page=${page}&key=24558564-a16a5722e1280d44cb84f27e6&image_type=photo&orientation=horizontal&per_page=12`);
      const currentItems = response.data.hits.map(({ id, webformatURL, largeImageURL, tags }) => {
        return { id, webformatURL, largeImageURL, tags };
      });
      setItems(items => [...items, ...currentItems])
      setStatus('resolved');

      if (response.data.hits.length === 0) {
        toast.error('Неправильный запрос, давай по новой!', { position: "top-center", });
      }
    } catch (error) {
      toast.error('Все пропало!', { position: "top-center", });
      setStatus('rejected');
    }
    };

    fetchPictures();

  }, [searchItem, page])

  
  const handleFormSubmit = searchQuery => {
    setSearchItem(searchQuery);
    setItems([]);
    setPage(1);
  };

  const toggleModal = largeImageURL => {
    setShowModal({ showModal: !showModal });
    setImageModal({ imageModal: largeImageURL });
  };

  
  return (
    <>
      <Searchbar onSubmit={handleFormSubmit} />
      {items.length > 0 && <ImageGallery pictures={items} onClick={toggleModal} />}
      {status === 'pending' && <LoaderImg />}
      {(items.length === 12 || items.length > 12) && <LoadMoreBtn onClick={() => setPage(page => page + 1)} />}
      {showModal &&
        <Modal onClose={toggleModal}>
          <img src={imageModal} alt="" />
        </Modal>
      }
      <ToastContainer autoClose={2000} />
    </>
  );
};