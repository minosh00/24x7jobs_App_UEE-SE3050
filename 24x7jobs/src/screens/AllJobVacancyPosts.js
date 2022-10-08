  


  
 


 
import { View, Text, StatusBar, FileList, TextInput, StyleSheet, ActivityIndicator, Image, Linking, TouchableOpacity, Platform } from 'react-native';
import React, { useState, useEffect } from 'react';

import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';


const LeftContent = props =>   <Avatar.Image size={74} source={require('../assets/logo.png')} style={{backgroundColor:'white'}}/>

const AllJobVacancyPosts = () => {

  const [jobs, setjobs] = useState([]);
  const [serachItem, setserachItem] = useState([]);

  

  useEffect(() => {
    fetch('https://jobapplyy.herokuapp.com/jobs/getAllJobs')
      .then((re) => re.json())
      .then((re) => {
        setjobs(re.jobs)
        console.log(re.jobs)
      })
  }, []);

  return (


    <View style={styles.container}>
      <Text style={styles.heading}>All Job Vacancy</Text>
      <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center' }} >
        <TextInput placeholderTextColor={'#000'} style={styles.searchBar} onChange={event => { setserachItem(event.target.value) }} placeholder={'Search using Job name'} />
      </View>

      <View style={styles.CompanyListBody}>

        {jobs.length > 0 && jobs.filter((jobs) => {

          if (serachItem == '') {
            return jobs
          } else if (jobs.JobPosition.toLowerCase().includes(serachItem.toLowerCase())) {

            return jobs
          }
        })

          .map((row,index) => {

            return (
              <View >
                <br></br>
      <Card>
    <Card.Title    left={LeftContent} />
    <Card.Content>
      <Title>Job Position: {row.JobPosition}</Title>
      <Paragraph>Job No: {index+1} </Paragraph>
      <br></br>
      <Paragraph>JobType:{row.JobType} </Paragraph>
     
    </Card.Content>
   
    <Card style={{padding: 10, margin: 10}}>
    <Card.Cover source={row.imageLink}  />
    <br></br>
        <Text>Company Name: {row.JobCompanyName}</Text>
     
       
      </Card>
   
    <Card.Actions>
      <Button buttonColor='red' textColor='white'>View Details</Button>
      <Button buttonColor='green' >Apply This Job</Button>
    </Card.Actions>
  </Card>
              </View>


           
            );

          })}









      </View>



      <StatusBar style="auto" />
    </View>

  );
}


const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: '',
  },
  heading: {
    fontSize: 32,
    marginTop: 50,
    marginLeft: 15,
    fontWeight: "bold",

  },
  searchBar: {
    width: '100%',
    height: 40,
    backgroundColor: 'rgba(0, 0, 0, 0.06)',
    marginTop: 10,
    borderRadius: 20,
    paddingLeft: 15
  },
  button:{
    width:120,
    alignSelf:"center",
    height:52,
    color:"#DC8517",
    backgroundColor:"#DC8517",
    marginRight:20,
    marginTop:20,

  }

});


export default AllJobVacancyPosts;