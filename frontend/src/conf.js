//debemos arreglar el process.ev ya que aun tiene defecto
// export const API_URL = process.env.REACT_APP_API || 'http://localhost:4040/api'; 
// export const PF_PERSON = process.env.REACT_APP_PUBLIC_FOLDER+'/person/' || 'http://localhost:3000/assets/person/'; 
// export const PF_POST = process.env.REACT_APP_PUBLIC_FOLDER+'/post/' || 'http://localhost:3000/assets/assets/post/'; 

// export const URL_POST = process.env.REACT_APP_API+'/posts' || "http://localhost:4040/assets/post/"  

module.exports = {
    API_URL: process.env.REACT_APP_API 
            || 'http://localhost:4040/api',
    PF_PERSON: process.env.REACT_APP_PUBLIC_FOLDER+'/person/' 
            || 'http://localhost:3000/assets/person/',
    PF_POST: process.env.REACT_APP_PUBLIC_FOLDER+'/post/' 
            || 'http://localhost:3000/assets/assets/post/',
    IMG_POST_SERVER: process.env.REACT_APP_IMAGE_SERVER +'/posts/'
            || 'http://localhost:4040/public/images/posts/' ,
    IMG_PERSON_SERVER: process.env.REACT_APP_IMAGE_SERVER+'/persons/' 
            || 'http://localhost:4040/public/images/persons',
    IMG_RECURSOS_SERVER: process.env.REACT_APP_IMAGE_SERVER+'/recursos' 
            || 'http://localhost:4040/public/images/recursos',
    IMG_PUBLIC: 'http://localhost:3000/assets'
}

