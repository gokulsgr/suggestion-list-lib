/* eslint-disable react/prop-types */
/* eslint-disable complexity */
/* eslint-disable react/no-did-update-set-state */
/* eslint-disable class-methods-use-this */
/* eslint-disable react/no-array-index-key */
import React, { Component, Fragment } from 'react';

import Label from './Components/Label';
import Input from './Components/Input';
import IconButton from './Components/IconButton';
import Button from './Components/Button';
import SelectedValue from './Components/Dropdown/Components/SelectedValue';
import DropdownListItem from './Components/Dropdown/Components/DropdownList/Components/DropdownListItem';
import DropdownList from './Components/Dropdown/Components/DropdownList';
import './styles.scss';

// import match from 'autosuggest-highlight/match';

class SuggestionList extends Component {
    /**
     * @memberof SuggestionList
     * @function
     * @name constructor
     * @param {Object} props - props.
     */
    constructor(props) {
        super(props);
        this.state = {
            parentId: props.parentId,
            inputValue: props.inputValue,
            title: props.title,
            focus: false,
            data: props.data,
            elementId: -1,
            id: props.id,
            type: props.type,
            searchButton: props.searchButton,
            onChange: props.onChange,
            checkBox: props.checkBox,
            clear: props.clear,
            auto: props.auto,
            suggestions: props.data || [],
            original: props.data || [],
            maxItems: props.maxItems,
        };
        this.onKeyDownInput = this.onKeyDownInput.bind(this);
        this.onFocusInput = this.onFocusInput.bind(this);
        this.handleOutsideClick = this.handleOutsideClick.bind(this);
        this.selectSuggestions = this.selectSuggestions.bind(this);
        this.selectSuggestionsById = this.selectSuggestionsById.bind(this);
        this.onChangeInput = this.onChangeInput.bind(this);
    }

    /**
     * @memberof SuggestionList
     * @name componentDidUpdate
     * @description componentDidUpdate
     * @param {object} prevProps -prevProps
     * @returns {null} nothing
     */
    componentDidUpdate(prevProps) {
        const { data } = this.props;
        if (prevProps.data !== data) {
            this.setState(prevState => ({
                ...prevState,
                data,
                suggestions: data,
                original: data,
            }));
        }
    }

    /**
     * @memberof SuggestionList
     * @name componentWillUnMount
     * @description componentWillUnMount
     * @returns {null} nothing
     */
    componentWillUnmount() {
        document.removeEventListener('click', this.handleOutsideClick, false);
    }

    /**
     * @memberof SuggestionList
     * @name onKeyDownInput
     * @description onKeyDownInput
     * @param {object} e -event
     * @returns {null} nothing
     */
    onKeyDownInput(e) {
        const { elementId, id } = this.state;
        const elements = document.getElementById(`${ id }List`).getElementsByClassName(`${ id }-list-item`);
        switch (e.keyCode) {
            case 38:
                if (elementId === 0) {
                    document.getElementById(`${ id }List`).scrollTop = document.getElementById(`${ id }List`).scrollHeight;
                    elements[ 0 ].classList.remove('focus');
                    elements[ elements.length - 1 ].classList.add('focus');
                    this.setState(prevState => ({
                        ...prevState,
                        elementId: elements.length - 1,
                    }));
                } else if (elementId !== -1) {
                    if (elements.length - elementId + 1 > document.getElementById(`${ id }List`).offsetHeight / document.getElementsByClassName(`${ id }-list-item`)[ 0 ].offsetHeight) {
                        const height = document.getElementsByClassName(`${ id }-list-item`)[ 0 ].offsetHeight;
                        document.getElementById(`${ id }List`).scrollTop -= height;
                    }
                    elements[ elementId ].classList.remove('focus');
                    elements[ elementId - 1 ].classList.add('focus');
                    this.setState(prevState => ({
                        ...prevState,
                        elementId: elementId - 1,
                    }));
                }
                break;
            case 40:
                if (elementId === elements.length - 1) {
                    document.getElementById(`${ id }List`).scrollTop = 0;
                    elements[ elementId ].classList.remove('focus');
                    elements[ 0 ].classList.add('focus');
                    this.setState(prevState => ({
                        ...prevState,
                        elementId: 0,
                    }));
                } else if (elementId === -1) {
                    elements[ elementId + 1 ].classList.add('focus');
                    this.setState(prevState => ({
                        ...prevState,
                        elementId: elementId + 1,
                    }));
                } else {
                    if (elementId + 2 > document.getElementById(`${ id }List`).offsetHeight / document.getElementsByClassName(`${ id }-list-item`)[ 0 ].offsetHeight) {
                        const height = document.getElementsByClassName(`${ id }-list-item`)[ 0 ].offsetHeight;
                        document.getElementById(`${ id }List`).scrollTop += height;
                    }
                    elements[ elementId ].classList.remove('focus');
                    elements[ elementId + 1 ].classList.add('focus');
                    this.setState(prevState => ({
                        ...prevState,
                        elementId: elementId + 1,
                    }));
                }
                break;
            case 13:
                if (elementId !== -1) {
                    this.selectSuggestionsById(elementId);
                } else {
                    const { onEnter } = this.props;
                    const {
                        type, inputValue,
                    } = this.state;
                    document.removeEventListener('click', this.handleOutsideClick, false);
                    if (elementId !== -1) {
                        document.getElementById(`${ id }List`).getElementsByClassName(`${ id }-list-item`)[ elementId ].classList.remove('focus');
                    }
                    this.setState(prevState => ({
                        ...prevState,
                        focus: false,
                        elementId: -1,
                    }));
                    if (type === 'text') {
                        document.getElementById(id).blur();
                    }
                    document.getElementById(`${ id }List`).classList.remove('active');
                    if (onEnter) {
                        onEnter(inputValue);
                    }
                }
                break;
            default:
        }
    }

    /**
     * @memberof SuggestionList
     * @function
     * @name onFocusInput
     * @returns {null} nothing .
     */
    onFocusInput() {
        const {
            focus, elementId, id, type,
        } = this.state;
        if (!focus) {
            document.addEventListener('click', this.handleOutsideClick, false);
            document.getElementById(`${ id }List`).classList.add('active');
            this.setState(prevState => ({
                ...prevState,
                focus: true,
                elementId: -1,
            }));
        } else {
            document.removeEventListener('click', this.handleOutsideClick, false);
            if (elementId !== -1) {
                document.getElementById(`${ id }List`).getElementsByClassName(`${ id }-list-item`)[ elementId ].classList.remove('focus');
            }
            this.setState(prevState => ({
                ...prevState,
                focus: false,
                elementId: -1,
            }));
            if (type === 'text') {
                document.getElementById(id).blur();
            }
            document.getElementById(`${ id }List`).classList.remove('active');
        }
    }

    /**
     * @memberof SuggestionList
     * @name onChangeInput
     * @description onChangeInput
     * @param {object} e -event
     * @returns {null} nothing
     */
    onChangeInput(e) {
        e.persist();
        const { onChangeInput, data, auto } = this.props;
        this.setState(prevState => ({
            ...prevState,
            inputValue: e.target.value,
            elementId: -1,
        }));
        if (auto) {
            const escapedValue = e.target.value.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const regex = new RegExp(`${ escapedValue }`, 'i');
            this.setState(prevState => ({
                ...prevState,
                inputValue: e.target.value,
                elementId: -1,
                suggestions: data.filter(el => regex.test(el.value)),
            }));
        }
        if (onChangeInput) {
            onChangeInput(e.target.value);
        }
    }

    /**
     * @memberof SuggestionList
     * @name onClear
     * @description onClear
     * @returns {null} nothing
     */
    onClear() {
        const { onChangeInput } = this.props;
        this.setState(prevState => ({
            ...prevState,
            inputValue: '',
        }));
        if (onChangeInput) {
            onChangeInput('');
        }
    }

    /**
     * @memberof SuggestionList
     * @name selectSuggestions
     * @description selectSuggestions
     * @param {object} e - event
     * @param {object} val - value
     * @returns {null} nothing
     */
    selectSuggestions(e, val) {
        e.preventDefault();
        const {
            id, type, onChange, checkBox,
        } = this.state;
        if (!checkBox) {
            this.setState(prevState => ({
                ...prevState,
                inputValue: val.value,
                focus: false,
                elementId: -1,
            }));
            document.getElementById(id).value = val.value;
            if (onChange) {
                onChange(val);
            }
            document.getElementById(`${ id }List`).classList.remove('active');
            document.removeEventListener('click', this.handleOutsideClick, false);
            if (type === 'text') {
                document.getElementById(id).blur();
            }
        } else {
            console.log('main');
        }
    }

    /**
     * @memberof SuggestionList
     * @name selectSuggestions
     * @description selectSuggestions
     * @param {string} elementId - elementid
     * @returns {null} nothing
     */
    selectSuggestionsById(elementId) {
        const {
            id, type, data, onChange,
        } = this.state;
        this.setState(prevState => ({
            ...prevState,
            inputValue: data[ parseInt(elementId, 10) ].value,
            elementId: -1,
            focus: false,
        }));
        document.getElementById(id).value = data[ parseInt(elementId, 10) ].value;
        if (onChange) {
            onChange(data[ parseInt(elementId, 10) ]);
        }
        if (type === 'text') {
            document.getElementById(id).blur();
        }
        document.getElementById(`${ id }List`).classList.remove('active');
        document.removeEventListener('click', this.handleOutsideClick, false);
        const elements = document.getElementById(`${ id }List`).getElementsByClassName(`${ id }-list-item`);
        elements[ elementId ].classList.remove('focus');
        document.removeEventListener('click', this.handleOutsideClick, false);
    }

    /**
     * @memberof SuggestionList
     * @name handleOutsideClick
     * @description handleOutsideClick
     * @param {object} e - event
     * @returns {null} nothing
     */
    handleOutsideClick(e) {
        const { id, elementId, checkBox } = this.state;
        const data = document.getElementsByClassName(`${ id }-main-class`);
        const divs = Array.prototype.filter.call(data, testElement => testElement.contains(e.target));
        if (divs.length >= 1) {
            this.setState(prevState => ({
                ...prevState,
                focus: false,
            }));
            if (!checkBox) {
                document.getElementById(`${ id }List`).classList.remove('active');
            }
            const elements = document.getElementById(`${ id }List`).getElementsByClassName(`${ id }-list-item`);
            if (elements[ elementId ]) {
                elements[ elementId ].classList.remove('focus');
            }
            document.removeEventListener('click', this.handleOutsideClick, false);
            return;
        }
        this.onFocusInput();
    }

    /**
     * @memberof SuggestionList
     * @name renderClearButton
     * @description Renders Component.
     * @returns {HTMLDOM} html document
     */
    renderClearButton() {
        const { clear, inputValue } = this.state;
        if (clear && inputValue !== '') {
            return (
                <Button className="clear-text" transparent type="button" onClick={() => this.onClear()}>X</Button>
            );
        }
        return <Fragment />;
    }

    /**
     * @memberof SuggestionList
     * @name renderClearButton
     * @description Renders Component.
     * @returns {HTMLDOM} html document
     */
    renderInputType() {
        const { type, id, inputValue } = this.state;
        if (type === 'text') {
            return (
                <Fragment>
                    <Input
                        id={id}
                        type="text"
                        value={inputValue}
                        autoComplete="off"
                        placeholder="Enter here"
                        onChange={e => this.onChangeInput(e)}
                        onKeyDown={this.onKeyDownInput}
                        onClick={this.onFocusInput}
                    />
                    {
                        this.renderClearButton()
                    }

                </Fragment>
            );
        }
        return (
            <SelectedValue onClick={this.onFocusInput} role="presentation">
                <span>{inputValue}</span>
                <img src="https://s3.us-east-2.amazonaws.com/io.assets/pple/svg/dropdown.svg" alt="dropdown" className="img-fluid" />
            </SelectedValue>
        );
    }

    /**
     * @memberof SuggestionList
     * @name renderAvatar
     * @description Renders Component.
     * @param {object} val - value
     * @returns {HTMLDOM} html document
     */
    renderAvatar(val) {
        if (val.avatar) {
            return (
                <figure className="avatar">
                    <img className="avatar" src={val.avatar} alt={val.value} />
                </figure>
            );
        }
        return <Fragment />;
    }

    /**
     * @memberof SuggestionList
     * @name renderDropDownList
     * @description Renders Component.
     * @returns {HTMLDOM} html document
     */
    renderDropDownList() {
        const {
            data, id, checkBox, auto, suggestions,
        } = this.state;
        let suggestionsData = [];
        if (auto) {
            suggestionsData = suggestions.slice();
        } else {
            suggestionsData = data.slice();
        }
        if (checkBox) {
            return suggestionsData.map((val, i) => (
                <li className="form-check form-check-inline" key={val.key || i}>
                    <label
                        htmlFor={`${ id }-list-item-input`}
                        className="form-check-label"
                        tabIndex="-1"
                        type="checkBox"
                        onClick={e => this.selectSuggestions(e, val)}
                    >
                        <input
                            className="form-check-input styled-checkBox"
                            id={`${ id }-list-item-input`}
                        />
                        <span className="check-indicator" />
                        {val.value}
                    </label>
                </li>
            ));
        }
        return suggestionsData.map((val, i) => (
            <DropdownListItem
                tabIndex="-1"
                role="presentation"
                key={val.key || i}
                className={`${ id }-list-item`}
                onClick={e => this.selectSuggestions(e, val)}
            >
                {this.renderAvatar(val)}
                {val.value}
            </DropdownListItem>
        ));
    }

    /**
     * @memberof SuggestionList
     * @name renderTitle
     * @description Renders Component.
     * @returns {HTMLDOM} html document
     */
    renderTitle() {
        const { title, id } = this.state;
        if (title) {
            return <Label htmlFor={id}>{title}</Label>;
        }
        return <Fragment />;
    }

    /**
     * @memberof SuggestionList
     * @name renderSearchButton
     * @description Renders Component.
     * @returns {HTMLDOM} html document
     */
    renderSearchButton() {
        const { searchButton } = this.state;
        if (searchButton) {
            return (
                <IconButton>
                    <img src="https://s3.us-east-2.amazonaws.com/io.assets/pple/svg/search.svg" alt="search" className="img-fluid" />
                </IconButton>
            );
        }
        return <Fragment />;
    }

    /**
     * @memberof SuggestionList
     * @name render
     * @description Renders Component.
     * @returns {HTMLDOM} html document
     */
    render() {
        const { id, type, maxItems } = this.state;
        return (
            <div className={`${ id }-main-class suggestion-block ${ type === 'text' ? 'type-here' : 'select-me' }`}>
                {this.renderTitle()}
                {this.renderSearchButton()}
                {this.renderInputType()}
                <DropdownList id={`${ id }List`} no={maxItems || 5}>
                    {this.renderDropDownList()}
                </DropdownList>
            </div>
        );
    }
}

export default SuggestionList;
