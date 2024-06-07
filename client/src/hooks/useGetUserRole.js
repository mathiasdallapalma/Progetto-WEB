export const useGetUserRole = () => {
    return window.localStorage.getItem("role");
}