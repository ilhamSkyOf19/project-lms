// types menu
export type Menu = {
    link: string;
    label: string;
}


// types menu side bar 
export type MenuSidebar = {
    link: string;
    icon: '3dcube-white' | 'note-favorite-white' | 'crown-white' | 'profile-2user-white' | 'security-card-white' | 'cup-white' | 'setting-2-white';
    label: string;
}


// types data chart
export type DataChart = {
    data: string;
    value: number;
}


// types data student
export type DataStudent = {
    name: string;
    totalCourse: number;
    statusCourse: boolean;
    img: 'photo-1' | 'photo-2.png' | 'photo-3.png' | 'photo-4.png' | 'photo-5.png';
}



// types data course 
export type DataCourse = {
    name: string;
    img: 'th-1.png' | 'th-2.png' | 'th-3.png' | 'th-4.png' | 'th-5.png';
    category: 'programming' | 'design' | 'data science' | 'marketing';
    students: number;
}