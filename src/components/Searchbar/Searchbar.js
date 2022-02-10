import { Component } from 'react';
import  {SearchbarHead, SearchForm, SearchFormButton, SearchFormInput} from './Searchbar.styled.jsx';
import { FcSearch } from 'react-icons/fc';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';


export default class Searchbar extends Component {

    static propTypes = { onSubmit: PropTypes.func.isRequired };

    state = {
        searchItem: '',
    }

    handleSearchChange = event => {
        this.setState({ searchItem: event.currentTarget.value.toLowerCase() });
    }

    handleSubmit = event => {
        event.preventDefault();
        if (this.state.searchItem.trim() === '') {
            toast.error('Все пропало, пиши по новой!', { position: "top-center", });
            this.setState({ searchItem: '' });
            return;
        }
        this.props.onSubmit(this.state.searchItem);
        this.setState({ searchItem: '' });
    }


    render() {
    return (
        <SearchbarHead >
            <SearchForm onSubmit={this.handleSubmit}>
                <SearchFormButton type="submit">
                    <FcSearch size={18}/> <span>Search</span>
                </SearchFormButton>

                <SearchFormInput
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                    value={this.state.searchItem}
                    onChange={this.handleSearchChange}
                />
            </SearchForm>
        </SearchbarHead>
    );
}
};