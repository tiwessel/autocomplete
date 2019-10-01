import React from 'react';
import './Autocomplete.css';

class Autocomplete extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: 0,
            filteredItems :[],
            inputValue: '',
            loadingClass : ''
        };

        this.timer = null;
        this.onChange = this.onChange.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
        this.handleFilteredItems = this.handleFilteredItems.bind(this);
    }
    
    onClick(e) {
        this.setState({  
            inputValue : e.target.innerText,
            filteredItems : []
        });
    }

    onChange (e) {
        var inputValue = e.target.value;
        this.setState({ inputValue }); 

        if(inputValue.length >= this.props.minLength){
            this.handleFilteredItems(inputValue)        
        } else {
            this.setState({ filteredItems : [] });
        }
    }

    handleFilteredItems(inputValue){
        this.setState({ loadingClass:'loading' }); 

        clearTimeout(this.timer);
        this.timer = setTimeout( ()=> {
            var filteredItems = this.props.items.filter(
                (item) => item.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
            );

            this.setState({
                filteredItems,
                selected: 0,
                loadingClass:''
            }); 
        }, this.props.delay );
    }

    onKeyDown(e) {
       
        const { selected, filteredItems } = this.state;
        if(filteredItems.length > 0) {
            switch (e.keyCode) {
                case 13:
                    this.setState({  
                        inputValue : filteredItems[selected],
                        filteredItems : []
                    });    
                break;
                case 38:
                    e.preventDefault();
                    if (selected === 0) {
                        break;
                    }
                    this.setState({ selected: selected - 1 });             
                break;
                case 40:
                    e.preventDefault();
                    if (selected === filteredItems.length - 1 ) {
                        break;
                    }
                    this.setState({ selected: selected + 1 });
                break;
                default:
                break;
            }
        }
    }

    render() {
        if (this.state.inputValue.length >= this.props.minLength) {
            if (this.state.filteredItems) {
                var filteredItems = (
                    <ul className="autocomplete-results" data-testid="test-results">
                    {this.state.filteredItems.map((item,i) =>
                        <li key={i} className={i === this.state.selected ? 'selected' :'' } onClick={this.onClick}>{item}</li>
                    )}
                    </ul>
                )
            }
        }
        
        return( 
            <div className="autocomplete">
                <input 
                    placeholder={this.props.placeholder}
                    name={this.props.name}
                    type="text"
                    className={this.props.className + " " + this.state.loadingClass}
                    onChange={this.onChange}
                    onKeyDown={this.onKeyDown}
                    value={this.state.inputValue}
                    data-testid="test-input"
                />

                {filteredItems}
    
            </div>
        );
    }
}

export default Autocomplete;