import react from 'react';
import Card from './Components/Card'



function App() {
  return (
    <div className="App">
      <Card
        title="Beaver Tails"
        span="$12"
        imageUrl="https://www.themealdb.com/images/media/meals/ryppsv1511815505.jpg"
        body="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut cursus, tellus eget tempor vulputate, dolor orci congue nisi, nec finibus augue nisl eget velit. Praesent vestibulum placerat felis, et lobort nec maximus. Aliquam sed pretium augue. Nunc ac malesuada dui. In acleocondimentum, maximus leo id, cursus quam."
      />
    </div>
  );
}


export default App