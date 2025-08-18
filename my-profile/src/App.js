import myAvatar from './image/My avatar.jpg'
import './App.css';

function App() {

  function Avatar() {
    return (  
      <div className="avatar">
        <img  src={myAvatar} alt="" style={{ width: "150px", height: "150px" }} />
      </div>
    );
  }

  function MemberInfo() {
    return (  
      <div className="info">
        <h2>Phạm Nguyễn Tiến Mạnh</h2>
        <p>Tuổi: 20</p>
      </div>
    );
  }

  function Comment() {
    return (  
      <div className="comment">
        Sinh viên khoa CNTT-HCMUTE
      </div>
    );
  }
  

  return (
    <div className="App">
      <Avatar/>
      <MemberInfo/>
      <Comment/>
    </div>
  );
}

export default App;
