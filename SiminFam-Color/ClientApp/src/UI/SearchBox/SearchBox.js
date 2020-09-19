import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styles from './SearchBox.module.scss';
import searcIcon from '../../Assets/images/search.png'
import Loading from '../Loading/Loading';
import http from '../../Helpers/axios';
import propTypes from 'prop-types';

class SearchBox extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: '',
            timeOut: null,
            loading: false,
            result: [],
            loadingStyle: {
                width: "20px",
                position: "absolute",
                left: "4px",
                top: "9px",
            },
            showSelected: false,
            selectedText: '',
            selectedValues: {
                value: '',
                text: ''
            }
        }
        this.searchBoxRef = React.createRef();
    }



    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside)
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside)
    }

    handleClickOutside = (event) => {
        if (this.state.result.length > 0) {
            const domNode = ReactDOM.findDOMNode(this);
            if (!domNode || !domNode.contains(event.target)) {
                this.setState({ result: [], loading: false, value: '' })
            }
        }
    }

    handleSearch = value => {
        clearTimeout(this.state.timeOut)
        this.setState({ result: [], loading: true, value: value })
        this.state.timeOut = setTimeout(() => {
            if (value.trim()) {
                this.handleApiReq(value).then(x => {
                    this.setState({ result: this.state.result.concat(x.data), loading: false })
                })
            } else {
                this.setState({ loading: false })
            }
        }, this.props.timeout);
    }

    removeSelected = () => {
        this.setState({ showSelected: false });
        this.props.removeSelected(this.props.name, '', '')
    }

    handleApiReq = value => {
        const obj = {};
        this.props.reqParam.map(x => obj[x] = value)
        return http.get(this.props.url, {
            params: obj
        })
    }

    showReport = (text, id) => {
        let st = { ...this.state }
        st.showSelected = true;
        st.selectedText = text;
        st.result = [];
        st.selectedValues = {
            ...st.selectedValues,
            value: id,
            text: text
        }
        this.props.removeOnChoose
            && this.setState({ ...st })
        this.props.handleResponse({ text: text, id: id })
        this.setState({ result: [] })
    }

    createDropdown = () => {
        const items = this.state.result.map(obj => {
            return { text: this.props.resParam.map(key => obj[key]).join(' / '), id: obj[this.props.id] }
        })
        return items.map((item, index) => {
            return <li key={index} onClick={() => this.showReport(item.text, item.id)}>{item.text}</li>
        })
    }

    render() {
        return (
            <div className={styles.searchBox} ref={this.searchBoxRef} name={this.props.name}
                style={this.props.width
                    ? { width: this.props.width + "rem" }
                    : { width: '100%' }}>
                {this.state.showSelected && <div className={styles.searchBoxSelected}>
                    <span>{this.state.selectedText}</span>
                    <span onClick={this.removeSelected}>✖</span>
                </div>}
                <img src={searcIcon} className={styles.searchIcon} />
                <Loading show={this.state.loading} style={this.state.loadingStyle} />
                <input placeholder={this.props.placeholder} autoComplete="off"
                    value={this.state.value}
                    onChange={(e) => this.handleSearch(e.target.value)} />
                {this.state.result.length > 0 && <ul>
                    {this.createDropdown()}
                </ul>}
            </div>
        )
    }
}
SearchBox.propTypes = {
    reqParam: propTypes.array,
    url: propTypes.string,
    resParam: propTypes.array,
    placeholder: propTypes.string,
    width: propTypes.string,
    handleResponse: propTypes.func,
    removeOnChoose: propTypes.bool,
    timeout: propTypes.string,
    name: propTypes.string,
    id: propTypes.string
}
export default SearchBox;