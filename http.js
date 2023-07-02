import axios from "axios";
export function storeGoal(goal)
{
    axios.post(
        'https://smitlist-d4821-default-rtdb.firebaseio.com/goals.json',
        goal
        ).then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
}