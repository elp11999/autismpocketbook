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
class TopicsTable extends React.Component {
    
    componentDidMount() {
    }

    onChange(evt) {
    }

    render() {
        const { data } = this.props;
        //console.log(data);
        // <a className="table-icon" href={"/forum/listposts?tid=" + row.original._id}><Book /></a>
        return(
            <ReactTable
                columns={[
                {
                    Header: "Topics",
                    accessor: "topics",
                    headerStyle: {fontSize: 15, textAlign: 'center', backgroundColor: "blue", color: "white", borderRight: "1px solid lightgray"},
                    style: { 'white-space': 'normal' },
                    Cell: row => (
                    <div>
                        <a className="table-icon" href={"/forum/listposts?tid=" + row.original._id}><Person /></a>                    
                        <div className="table-header">
                            <span>
                                <a className="forum-a" href={"/forum/listposts?tid=" + row.original._id}>{row.original.title}</a>
                            </span>
                            <p className="table-info-text">{"Author: " + row.original.author}</p>
                        </div>
                    </div>
                    ),
                    minWidth: 150
                },
                {
                    Header: "Replies",
                    accessor: "replies",
                    headerStyle: {fontSize: 15, textAlign: 'left', backgroundColor: "blue", color: "white", borderRight: "1px solid lightgray"},
                    Cell: row => (
                    <div className="table-cell">
                        <span className="table-info-text">
                            {row.original.replyCount}
                        </span>
                    </div>
                    ),
                    minWidth: 50
                },
                {
                    Header: "Views",
                    accessor: "views",
                    headerStyle: {fontSize: 15, textAlign: 'left', backgroundColor: "blue", color: "white", borderRight: "1px solid lightgray"},
                    Cell: row => (
                    <div className="table-cell">
                        <span className="table-info-text">
                            {row.original.viewCount}
                        </span>
                    </div>
                    ),
                    minWidth: 40
                },
                {
                    Header: "Last Post",
                    accessor: "lastPost",
                    headerStyle: {fontSize: 15, textAlign: 'left', backgroundColor: "blue", color: "white", borderRight: "1px solid lightgray"},
                    style: { 'white-space': 'normal' },
                    Cell: row => (
                    <div className="table-cell">
                        <span className="table-info-text">
                            {row.original.lastPost}
                        </span>
                        <p className="table-info-text">{row.original.lastUpdateBy}</p>
                    </div>
                    ),
                    minWidth: 100
                }
                ]}
                manual
                data={data}
                defaultPageSize={data.length}
                showPagination={data.length > 5 ? true : false}
                //className="-striped -highlight"
                //loading={loading} // Display the loading overlay when we need it                    
                //pages={pages} // Display the total number of pages
                //onFetchData={this.fetchData} // Request new data when things change
            />
        );
    }
}

export default TopicsTable;