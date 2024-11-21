import React, {useState} from 'react';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

import TablePagination from '@mui/material/TablePagination';
// npm install @mui/material @emotion/react @emotion/styled 
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    Button,
    useColorScheme,
    View,
  } from 'react-native';

  const styless = StyleSheet.create({
    text: {
      fontSize: 16, 
      color: 'steelblue'
    }
  });

  const dateRegex = new RegExp('^\\d\\d\\d\\d-\\d\\d-\\d\\d');

  const issue = [
    {
      ID: 1,
      Title: 'Add CSS',
      Owner: 'Jummny',
      Effor: 'Add a navigation bar',
      Status: 'Solved'
    }, //'ID', 'Title', 'Owner', 'Effort', 'Status'
  ];
  
  function jsonDateReviver(key, value) {
    if (dateRegex.test(value)) return new Date(value);
    return value;
  }

  async function graphQLFetch(query, variables = {}) {
    try {
        /****** Q4: Start Coding here. State the correct IP/port******/
        const response = await fetch('http://10.0.2.2:3000/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ query, variables })
        /****** Q4: Code Ends here******/
      });
      const body = await response.text();
      const result = JSON.parse(body, jsonDateReviver);
  
      if (result.errors) {
        const error = result.errors[0];
        if (error.extensions.code == 'BAD_USER_INPUT') {
          const details = error.extensions.exception.errors.join('\n ');
          alert(`${error.message}:\n ${details}`);
        } else {
          alert(`${error.extensions.code}: ${error.message}`);
        }
      }
      return result.data;
    } catch (e) {
      alert(`Error in sending data to server: ${e.message}`);
    }
  }

class IssueFilter extends React.Component {
    render() {
      return (
        <View style={styles.container}>
          {/****** Q1: Start Coding here. ******/}
          <Text style={styless.text}> Issue Filter Component </Text>
          <TextInput placeholder="Enter Filter Key words" />
          <Button title="Filter" onPress={this.handleSubmit} />
          {/****** Q1: Code ends here ******/}
        </View>
      );
    }
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 10, paddingTop: 20, backgroundColor: '#fff8dc', margin: 5,},
  header: { height: 50, backgroundColor: '#537791' },
  text: { textAlign: 'center', fontSize: 14, fontWeight: '500', paddingHorizontal: 15, paddingVertical: 7},
  dataWrapper: { marginTop: -1 },
  row: { height: 40, backgroundColor: '#E7E6E1' }
  });

const width= [40,80,80,80,80,80,100];

function IssueRow(props) {
    const issue = props.issue;
    {/****** Q2: Coding Starts here. Create a row of data in a variable******/}
    {/****** Q2: Coding Ends here.******/}
    return (
      <>
      {/****** Q2: Start Coding here. Add Logic to render a row  ******/}
      <Row data={[issue.ID, issue.Title, issue.Owner, issue.Effort, issue.Status]} style={styles.row} textStyle={styles.text} />
      {/****** Q2: Coding Ends here. ******/}  
      </>
    );
  }
  
  
  function IssueTable(props) {
    const issueRows = props.issues.map(issue =>
      <IssueRow key={issue.ID} issue={issue} />
    );
    {/****** Q2: Start Coding here. Add Logic to initalize table header  ******/}
    const tableHead = ['ID', 'Title', 'Owner', 'Effort', 'Status'];
    {/****** Q2: Coding Ends here. ******/}
    
    
    return (
      <View style={styles.container}>
        <Text style={styless.text}>Issue Table</Text>
      {/****** Q2: Start Coding here to render the table header/rows.**********/}
        <View>
        <ScrollView style={styles.scrollView}> 
          <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9'}} >
            <Row style={styles.container} data={tableHead} textStyle={styles.text} />
            <TableWrapper style={styles.dataWrapper}>
              {issueRows}
            </TableWrapper>
          </Table>
        </ScrollView>
        </View>
    {/****** Q2: Coding Ends here. ******/}
    </View>
    );
  }

  
  class IssueAdd extends React.Component {
    constructor() {
      super();
      /****** Q3: Start Coding here. Create State to hold inputs******/
      this.state = { title: '', owner: '', effort: '' };
      this.handleSubmit = this.handleSubmit.bind(this);
      /****** Q3: Code Ends here. ******/
    }
  
    /****** Q3: Start Coding here. Add functions to hold/set state input based on changes in TextInput******/
    handleChange(field, value) {
      this.setState({ [field]: value });
    /****** Q3: Code Ends here. ******/
    }
    handleSubmit() {
      /****** Q3: Start Coding here. Create an issue from state variables and call createIssue. Also, clear input field in front-end******/
      const newIssue = { title: this.state.title, owner: this.state.owner, effort: this.state.effort};
      this.props.createIssue(newIssue);
      this.setState({ title: '', owner: '', effort: '' }); // Clear inputs
      /****** Q3: Code Ends here. ******/
    }
  
    render() {
      return (
          <View style={styles.container}>
          <Text style={styless.text}>Issue Add </Text>
            {/****** Q3: Start Coding here. Create TextInput field, populate state variables. Create a submit button, and on submit, trigger handleSubmit.*******/}
          <TextInput placeholder="Title" value={this.state.title} onChangeText={(value) => this.handleChange('title', value)} />
          <TextInput placeholder="Owner" value={this.state.owner} onChangeText={(value) => this.handleChange('owner', value)} />
          <TextInput placeholder="Effort" value={this.state.effort} onChangeText={(value) => this.handleChange('effort', value)} />
          <Button title="Add Issue" onPress={this.handleSubmit} />
            {/****** Q3: Code Ends here. ******/}
          </View>
      );
    }
  }

class BlackList extends React.Component {
    constructor()
    {   super();
        this.handleSubmit = this.handleSubmit.bind(this);
        /****** Q4: Start Coding here. Create State to hold inputs******/
        this.state = {name: ''};
        /****** Q4: Code Ends here. ******/
    }
    /****** Q4: Start Coding here. Add functions to hold/set state input based on changes in TextInput******/
    setName(newname)
    {
      this.setState({name: newname});
    }
    /****** Q4: Code Ends here. ******/

    async handleSubmit() {
    /****** Q4: Start Coding here. Create an issue from state variables and issue a query. Also, clear input field in front-end******/
    const query = `mutation myaddToBlacklist ($newname: String!){
      addToBlacklist(nameInput: $newname)
    }`;
    const newname = this.state.name;
    console.log(newname)
    const data = await graphQLFetch(query, {newname});
    this.newnameInpput.clear();
    /****** Q4: Code Ends here. ******/
    }

    render() {
    return (
        <View style={styles.container}>
          <Text style={styless.text}> Blacklist </Text>
        {/****** Q4: Start Coding here. Create TextInput field, populate state variables. Create a submit button, and on submit, trigger handleSubmit.*******/}
        <TextInput ref={input => {this.newnameInpput = input}} placeholder='Name to Balcklist' onChangeText={newname => this.setName(newname)}/>
        <Button onPress = {this.handleSubmit} title = "Add to Blacklist"/>
        {/****** Q4: Code Ends here. ******/}
        </View>
    );
    }
}

export default class IssueList extends React.Component {
    constructor() {
        super();
        this.state = { issues: [{ID: 1, Title: 'Add CSS', Owner: 'Jummny', Effort: 'Add a navigation bar', Status: 'Solved'}, 
          {ID: 2, Title: 'Change Title', Owner: 'Sandra', Effort: 'Add a Title', Status: 'Unsolved'}, 
          {ID: 3, Title: 'Change Title', Owner: 'Sandra', Effort: 'Add a Title', Status: 'Unsolved'}, 
          {ID: 4, Title: 'Change Title', Owner: 'Sandra', Effort: 'Add a Title', Status: 'Unsolved'}, 
          {ID: 5, Title: 'Change Title', Owner: 'Sandra', Effort: 'Add a Title', Status: 'Unsolved'},
          {ID: 6, Title: 'Change Title', Owner: 'Sandra', Effort: 'Add a Title', Status: 'Unsolved'}]};
        this.createIssue = this.createIssue.bind(this);
    }
    
    componentDidMount() {
    this.loadData();
    }

    async loadData() {
    const query = `query {
        issueList {
        id title status owner
        created effort due
        }
    }`;

    const data = await graphQLFetch(query);
    if (data) {
        this.setState({ issues: data.issueList });
    }
    }

    async createIssue(issue) {
    const query = `mutation issueAdd($issue: IssueInputs!) {
        issueAdd(issue: $issue) {
        id
        }
    }`;

    const data = await graphQLFetch(query, { issue });
    if (data) {
        this.loadData();
    }
    }
    
    
    render() {
    return (
    <>
    {/****** Q1: Start Coding here. ******/}
    <IssueFilter />
    {/****** Q1: Code ends here ******/}


    {/****** Q2: Start Coding here. ******/}
    <IssueTable issues={this.state.issues} />
    {/****** Q2: Code ends here ******/}

    {/****** Q3: Start Coding here. ******/}
    <IssueAdd createIssue={this.createIssue} />
    {/****** Q3: Code Ends here. ******/}

    {/****** Q4: Start Coding here. ******/}
    <BlackList/>
    {/****** Q4: Code Ends here. ******/}
    </>
      
    );
  }
}