import axios from "axios";

const GoogleApi = " https://www.googleapis.com/books/v1/volumes";

export default {
  // Get books from Google
  getBooks: function(query) {
    let queryString = GoogleApi + "?q=" + query.replace(" ", "+");
    return axios.get(queryString);
  },
  // Get books from database
  getBook: function() {
    return axios.get("/api/books/");
  },
  // Deletes the book with the given id
  deleteBook: function(id) {
    return axios.delete("/api/books/" + id);
  },
  // Saves a parent to the database
  saveParent: function(parentData) {
    return axios.post("/api/parent", parentData);
  },
  // Saves a child to the database
  saveChild: function(id, childData) {
    return axios.post("/api/child/" + id, childData);
  },
  // Updates a child to the database
  updateChild: function(id, childData) {
    return axios.post("/api/updatechild/" + id, childData);
  },
  // Saves a note to the database
  saveNote: function(id, noteData) {
    return axios.post("/api/note/" + id, noteData);
  },
  // Authenticate user
  authenticateUser: function(userData) {
    return axios.post("/api/authenticate", userData);
  },
  // Authenticate user
  authenticate: function() {
    return axios.get("/api/authenticate");
  },
  // Get children count
  getChildrenCount: function(id) {
    return axios.get("/api/getchildrencount/" + id);
  },
  // Get all children
  getChildren: function(id) {
    return axios.get("/api/getchildren/" + id);
  },
  // Get all child notes
  getNotes: function(id) {
    return axios.get("/api/getnotes/" + id);
  },
  // Get child note by start date
  getNote: function(id, noteDate) {
    return axios.post("/api/getnote/" + id, noteDate);
  },
  // Update child note
  updateNote: function(id, noteDate) {
    return axios.post("/api/updatenote/" + id, noteDate);
  },
  // Get definition for word
  getDefinition: function(word) {
    return axios.get("/api/getdefinition/" + word);
  },
  // Start demo
  demo: function() {
    return axios.post("/api/demo");
  },
  // Get forum categories
  getCategories: function() {
    return axios.get("/api/getcategories/");
  },
  // Get forum topics
  getTopics: function(fid) {
    return axios.get("/api/gettopics/"+ fid);
  },
  // Get forum posts
  getPosts: function(tid) {
    return axios.get("/api/getposts/"+ tid);
  },
  // Saves a post to the database
  savePost: function(id, postData) {
    return axios.post("/api/post/" + id, postData);
  },
  // Saves a topic to the database
  saveTopic: function(id, topicData) {
    return axios.post("/api/topic/" + id, topicData);
  },
  // Saves topic views to the database
  saveTopicViews: function(id) {
    return axios.post("/api/topicviews/" + id);
  },
  // Reset password request
  forgotPswd: function(email) {
    return axios.post("/api/forgotpsw/" + email);
  },
  // Reset password
  resetPswd: function(resetData) {
    return axios.post("/api/resetpsw/", resetData);
  }
};