import video from '../assets/video.mp4'; 
import Example from '../NavBar';
import LoginPage from '../Login';


const HomePage = () => {
return(
  <>
  <Example></Example>
        <video autoPlay loop muted
          style={{
            position: "absolute",
            width: "100%",
            left: "50%",
            top: "50%",
            height: "100%",
            objectFit: "cover",
            transform: "translate(-50%, -50%)",
            zIndex: "-1"
          }}
        >
        <source src={video} type="video/mp4" />
      </video>
        <LoginPage></LoginPage>
  </>
)
}

export default HomePage