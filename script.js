const videoElement=document.querySelector('.video')

const startBtn=document.querySelector('.button')

const startBtnText="Start Picture In Picture Mode"

const exitBtnText="Exit Picture In Picture Mode"

const selectBtnText="Select Media To Stream"

let mediaStreamVariable = new MediaStream()



async function selectMediaStream(){

    await (navigator.mediaDevices.getDisplayMedia()).then(stream=>{
    
        mediaStreamVariable=stream;

        videoElement.srcObject=mediaStreamVariable;

        videoElement.onloadedmetadata = () =>{
            
            videoElement.play()

            startBtn.textContent=startBtnText

        }
        

    })
}

startBtn.addEventListener('click' , async (e)=>{


    if(e.target.textContent===selectBtnText){


        await selectMediaStream()

        mediaStreamVariable.getVideoTracks()[0].addEventListener('ended' , ()=>{

            startBtn.textContent=selectBtnText

            if(document.pictureInPictureElement){

                document.exitPictureInPicture()

            }
        
        })

    }

    else if(document.pictureInPictureElement){

        document.exitPictureInPicture()

        startBtn.textContent=startBtnText

    }

    else{

        await videoElement.requestPictureInPicture()

        startBtn.textContent=exitBtnText



    }

})




