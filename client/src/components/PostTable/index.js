// Import the React library
import React from "react";

// Import React Table
import ReactTable from "react-table";

// Import Material icons
import { Book } from "@material-ui/icons";
import { Person } from "@material-ui/icons";

// Import React-Table css
import "react-table/react-table.css";

// Import Custom css
import "./index.css";

// Table component
class PostTable extends React.Component {
    
    componentDidMount() {
    }

    onChange(evt) {
    }

    render() {

        const { data } = this.props;
        //console.log(data);
        return(
            <ReactTable
                columns={[
                {
                    Header: data.author,
                    accessor: "author",
                    headerStyle: {fontSize: 15, textAlign: 'center', backgroundColor: "blue", color: "white", borderRight: "1px solid lightgray"},
                    Cell: row => (
                    <div>
                        <span className="table-icon"><Person /></span>                    
                        <div className="table-header">
                            <p className="table-info-text">{data.author}</p>
                        </div>
                    </div>
                    ),                    
                    minWidth: 50
                },
                {
                    Header: "Post: " + data.postDate,
                    headerStyle: {fontSize: 15, textAlign: 'left', backgroundColor: "blue", color: "white", borderRight: "1px solid lightgray"},
                    style: { 'white-space': 'normal' },
                    Cell: row => (
                    <div className="table-cell">
                        <span className="table-info-text">{row.original.data}>
                        </span>
                    </div>
                    ),
                    minWidth: 150
                }
                ]}
                manual
                data={new Array(data)}
                defaultPageSize={1}
                showPagination={false}
                //pageSize={data.length}
                //className="-striped -highlight"
                //loading={loading} // Display the loading overlay when we need it                    
                //pages={pages} // Display the total number of pages
                //onFetchData={this.fetchData} // Request new data when things change
            />
        );
    }
}

export default PostTable;