import  Cookies from 'js-cookie';

// Desc: Custom hook to handle authentication state
export default function useAuth() {
    const isAuth = ()=>  Cookies.get("refreshToken") ? true : false;
    const isAccess = ()=>  Cookies.get("accessToken") ? true : false;
    const subs = ()=> Cookies.get("subscriptions");
    
   return {isAuth , isAccess , subs}
}
