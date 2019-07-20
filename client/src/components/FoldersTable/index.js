// Import the React library
import React from "react";

// Import React Table
import ReactTable from "react-table";

// Import Material icons
import { Folder } from "@material-ui/icons";

// Import React-Table css
import "react-table/react-table.css";

// Import Custom css
import "./index.css";

// Table component
class FoldersTable extends React.Component {
    
    componentDidMount() {
    }

    onChange(evt) {
    }

    render() {
        const { data } = this.props;
        //console.log(data);
        // <a className="table-icon" href={"/forum/topic?fid=" + row.original._id}><Folder /></a>
        return(
            <ReactTable
                columns={[
                    {
                        Header: data.title,
                        accessor: "folder",
                        headerStyle: {fontSize: 15, textAlign: 'left', backgroundColor: "blue", color: "white", borderRight: "1px solid lightgray"},
                        style: { 'white-space': 'normal' },
                        Cell: row => (
                        <div>                    
                            <div className="table-header">
                                <span>
                                    <a className="forum-a" href={"/forum/topic?fid=" + row.original._id}>{row.original.title}</a>
                                </span>
                                <p className="table-info-text">{row.original.description}</p>
                            </div>
                        </div>
                        ),
                        minWidth: 150
                    },
                    {
                        Header: "Topics",
                        accessor: "topics",
                        headerStyle: {fontSize: 15, textAlign: 'left', backgroundColor: "blue", color: "white", borderRight: "1px solid lightgray"},
                        Cell: row => (
                        <div className="table-cell">
                            <span className="table-info-text">
                                {row.original.topicCount}
                            </span>
                        </div>
                        ),
                        minWidth: 45
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
                data={data.folders}
                defaultPageSize={data.folders.length}
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

export default FoldersTable;