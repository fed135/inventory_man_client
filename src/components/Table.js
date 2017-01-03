import Inferno from 'inferno';
import Component from 'inferno-component';

class Table extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        var headerComponents = this.generateHeaders(),
            rowComponents = this.generateRows();

        return (
            <table class="table">
                <thead class="thead-inverse"> { headerComponents } </thead>
                <tbody> { rowComponents } </tbody>
            </table>
        );
    }

    sortBy(col) {
        if (this.props.sorted === col) this.props.data.reverse();
        else {
            this.props.data.sort((a, b) => {
                if (a[col] < b[col]) return -1;
                if (a[col] > b[col]) return 1;
                return 0;
            });
            this.props.sorted = col;
        }
        this.setState(this.state);
    }

    generateHeaders() {
        var cols = this.props.cols;  // [{key, label}]

        // generate our header (th) cell components
        return cols.map((colData) => {
            return <th data-key={colData.key} onClick={() => this.sortBy(colData.key)}> {colData.label} </th>;
        });
    }

    generateRows() {
        var cols = this.props.cols,  // [{key, label}]
            data = this.props.data;

        return data.map((item) => {
            // handle the column data within each row
            var cells = cols.map((colData) => {

                // colData.key might be "firstName"
                return <td> {item[colData.key]} </td>;
            });
            return <tr> {cells} </tr>;
        });
    }
}

export default Table;