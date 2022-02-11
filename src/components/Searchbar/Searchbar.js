import  { useState } from "react";
import  {SearchbarHead, SearchForm, SearchFormButton, SearchFormInput} from './Searchbar.styled.jsx';
import { FcSearch } from 'react-icons/fc';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';


export default function Searchbar({onSubmit}) {

    const [searchItem, setSearchItem] = useState('');

    const handleSearchChange = event => {
        setSearchItem(event.currentTarget.value.toLowerCase());
    };

    const handleSubmit = event => {
        event.preventDefault();
        if (searchItem.trim() === '') {
            toast.error('Все пропало, пиши по новой!', { position: "top-center", });
            setSearchItem('');
            return;
        };
        onSubmit(searchItem);
        setSearchItem('');
    };


    
    return (
        <SearchbarHead >
            <SearchForm onSubmit={handleSubmit}>
                <SearchFormButton type="submit">
                    <FcSearch size={18}/> <span>Search</span>
                </SearchFormButton>

                <SearchFormInput
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                    value={searchItem}
                    onChange={handleSearchChange}
                />
            </SearchForm>
        </SearchbarHead>
    );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};