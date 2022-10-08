import React,{useState} from 'react';
import { StyleSheet, Text, View,Modal,Alert,KeyboardAvoidingView} from 'react-native';
import {TextInput,Button} from 'react-native-paper'

import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';


const  AddNewJobVacancy =()=>{


    const [JobPosition,setJobPosition] = useState("");
    const [JobDescription,setJobDescription] = useState("");
    const [JobCompanyName,setJobCompanyName] = useState("");
    const [JobType,setJobType] = useState("");
    const [SalaryDetails,setSalaryDetails] = useState("");
    const [JobPeriod,setJobPeriod] = useState("");
    const [OtherDetails,setOtherDetails] = useState("");
    const [imageLink,setimageLink] = useState("");
    const [model,setmodel] = useState(false);

    
    const SubmitData = () =>{
        fetch("https://jobapplyy.herokuapp.com/jobs/createJobPost/",{

            method:"POST",
            headers:{
              'Content-Type': 'application/json'
        },
          body:JSON.stringify({

            JobPosition,
            JobDescription,
            JobCompanyName,
            JobType,
            SalaryDetails,
            JobPeriod,
            OtherDetails,
            imageLink
          })

        })
        .then(res=>res.json())
        .then(data=>{
            Alert.alert( "Job Vacancy added  successfully")
            console.log(data)
      
        })
        .catch(err=>{
          Alert.alert(`something went wrong `)
      })
  }

    const pickFromGallery = async()=>{
      
     const {granted}  = await Permissions.askAsync(Permissions.CAMERA_ROLL)

      if(granted){

        let data =   await ImagePicker.launchImageLibraryAsync({
            mediaTypes:ImagePicker.MediaTypeOptions.Images,
            allowsEditing:true,
            aspect:[1,1],
            quality:0.5
          })
          if(!data.cancelled){
            let newfile = {uri:data.uri,
                type:`test/${data.uri.split(".")[1]}`,
                name:`test.${data.uri.split(".")[1]}`
            }

            handleUpload(newfile)
         }

      }else{
            Alert.alert("you need to give up permission to work ")
      }
    }
     const pickFromCamera= async()=>{
      
        const {granted}  = await Permissions.askAsync(Permissions.CAMERA)
   
         if(granted){
   
           let data =   await ImagePicker.launchCameraAsync({
               mediaTypes:ImagePicker.MediaTypeOptions.Images,
               allowsEditing:true,
               aspect:[1,1],
               quality:0.5
             })
   
             if(!data.cancelled){
                let newfile = {uri:data.uri,
                    type:`test/${data.uri.split(".")[1]}`,
                    name:`test.${data.uri.split(".")[1]}`
                }

                handleUpload(newfile)
             }
         }else{
               Alert.alert("you need to give up permission to work ")
         }
    
    }

    const handleUpload = (image)=>{
        const data = new FormData()
        data.append('file' , image)
        data.append('upload_preset' , 'jobApp')
        data.append('cloud_name', 'sliit1')

        fetch("https://api.cloudinary.com/v1_1/sliit1/image/upload",{
            method:"post",
            body:data
        }).then(res=>res.json()).
        then(data=>{
            console.log(data)
            setimageLink(data.url)
            setmodel(false)
        })
    }



    return(
<View>

<TextInput
                label='JobPosition'
                style={styles.inputStyle}
                value={JobPosition}
                mode="outlined"
                onChangeText={text => setJobPosition(text)}
            />


<TextInput
                label='JobDescription'
                style={styles.inputStyle}
                value={JobDescription}
                mode="outlined"
                onChangeText={text => setJobDescription(text)}
            />

<TextInput
                label='JobCompanyName'
                style={styles.inputStyle}
                value={JobCompanyName}
                mode="outlined"
                onChangeText={text => setJobCompanyName(text)}
            />

<TextInput
                label='JobType'
                style={styles.inputStyle}
                value={JobType}
                mode="outlined"
                onChangeText={text => setJobType(text)}
            />

<TextInput
                label='SalaryDetails'
                style={styles.inputStyle}
                value={SalaryDetails}
                mode="outlined"
                onChangeText={text => setSalaryDetails(text)}
            />



<TextInput
                label='JobPeriod'
                style={styles.inputStyle}
                value={JobPeriod}
                mode="outlined"
                onChangeText={text => setJobPeriod(text)}
            />
            
<TextInput
                label='OtherDetails'
                style={styles.inputStyle}
                value={OtherDetails}
                mode="outlined"
                onChangeText={text => setOtherDetails(text)}
            />



<Button    theme={theme} 
icon= {imageLink==""?"upload":"check"}
style={styles.inputStyle} mode="contained"
 onPress={()=> setmodel(true)}> 
  upload Image
</Button>

<Button    theme={theme} icon="content-save" style={styles.inputStyle} 
mode="contained" 
onPress={()=> SubmitData()}> 
   save
</Button>


<Modal
animationType="slide"
transparent={true}
visible={model}
onRequestClose={()=>{
    setmodel(false)
}}
>

<View style={styles.modalView}>
<View style={styles.modalButtonView}>
<Button    theme={theme} icon="camera" mode="contained" onPress={()=> pickFromCamera()}> 
  camera
</Button>
<Button     theme={theme} icon="image-area" mode="contained" onPress={()=> pickFromGallery()}> 
  gallery
</Button>
</View>
<Button    theme={theme}   onPress={()=> setmodel(false)}> 
  cancel
</Button>

</View>


</Modal>



</View>
    )
}

const theme = {
    colors:{
        primary:"#006aff"
    }
}

const styles=StyleSheet.create({
    root:{
        flex:1
    },
    inputStyle:{
        margin:5
    },

    modalView:{
        position:"absolute",
        bottom:2,
        width:"100%",
        backgroundColor:"white"

    },
    modalButtonView:{
        flexDirection:"row",
        justifyContent:"space-around",
        padding:10
    }
})



export default AddNewJobVacancy;