import axios from "axios";
import { useCookies } from "react-cookie";

const usePostSkills = () => {
  const [, setCookie] = useCookies(["studentId"]);

  const postSkills = async (studentId, skills) => {
    try {
      const headers = {
        'Content-Type': 'application/json',
      };

      const response = await axios.post(
        `https://api.projectszero.tech/skills/${studentId}`,
        skills,
        { headers: headers }
      );

      setCookie("studentId", studentId);
      alert("送出成功");
    } catch (error) {
      alert(error);
    }
  };

  return postSkills;
};


export default usePostSkills;
