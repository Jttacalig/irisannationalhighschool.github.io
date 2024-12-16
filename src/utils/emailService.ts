import emailjs from '@emailjs/browser';

// Initialize EmailJS with your public key
emailjs.init("dWKMRtZG2q38KogaF");

interface ContactFormData {
    name: string;
    email: string;
    message: string;
}

interface EnrollmentFormData {
    firstName: string;
    middleName?: string;
    lastName: string;
    dateOfBirth: string;
    gender: string;
    address: string;
    email: string;
    phone: string;
    gradeLevel: string;
    strand?: string;
    previousSchool: string;
    schoolYear: string;
}

export const sendContactEmail = async (formData: ContactFormData) => {
    try {
        const templateParams = {
            to_email: 'jttacalig123@gmail.com',
            from_name: formData.name,
            from_email: formData.email,
            message: formData.message,
            reply_to: formData.email
        };

        const response = await emailjs.send(
            'service_288y4aj',
            'template_v1e5ugx',
            templateParams
        );

        return response;
    } catch (error) {
        console.error('Error sending contact email:', error);
        throw error;
    }
};

export const sendEnrollmentEmail = async (formData: EnrollmentFormData) => {
    try {
        const templateParams = {
            to_email: 'jttacalig123@gmail.com',
            student_name: `${formData.firstName} ${formData.middleName || ''} ${formData.lastName}`,
            date_of_birth: formData.dateOfBirth,
            gender: formData.gender,
            address: formData.address,
            email: formData.email,
            phone: formData.phone,
            grade_level: formData.gradeLevel,
            strand: formData.strand || 'N/A',
            previous_school: formData.previousSchool,
            school_year: formData.schoolYear,
            reply_to: formData.email
        };

        const response = await emailjs.send(
            'service_aemfl88',
            'template_4q1ta3e',
            templateParams
        );

        return response;
    } catch (error) {
        console.error('Error sending enrollment email:', error);
        throw error;
    }
};
