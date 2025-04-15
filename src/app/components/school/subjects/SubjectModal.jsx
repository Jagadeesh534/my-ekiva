import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Select from "react-select";
import { toast } from "react-toastify";
import axiosInstance from "../../../axiosInstance";
import { useSelector } from "react-redux";
import Loader from "../../Loader";

const api = "https://92de-2409-40f0-11cd-308d-b6f5-64dd-bd65-3bb6.ngrok-free.app/api/";

const SubjectFormModal = ({ show, onHide, onSave, subject }) => {
  const [formData, setFormData] = useState({ name: "", classroom_ids: [],id:null });
  const [errors, setErrors] = useState({});
  const [classData, setClassData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [disableModalClose, setDisableModalClose] = useState(false);

  const school = useSelector((state) => state.auth.school);

  
  useEffect(() => {
    const fetchClassData = async () => {
      try {
        const response = await axiosInstance.get(`${api}classrooms/`);
        const options = response.data.map((c) => ({
          value: c.id,
          label: c.name,
        }));
        setClassData(options);
       debugger
          if (subject) {
            try {
              setLoading(true);
              const response = await axiosInstance.get(`${api}subjects/${subject.id}/`);
              const subjectData = response.data;
              console.log(subjectData);
              setFormData({
                id: subjectData.id,
                name: subjectData.name || "",
                classroom_ids:
                  subjectData.classrooms,
              });
              console.log(formData);
              setLoading(false);
            } catch (error) {
              setLoading(false);
              toast.error("Failed to fetch subject data.");
              console.log(error);
            }
          } else {
            setFormData({ name: "", s: [] });
          }
        
      } catch (error) {
        toast.error("Failed to fetch classes.");
      }
    };
    fetchClassData();
  },[]);
  

 

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Subject name is required";
    if (formData.classroom_ids.length === 0)
      newErrors.classes = "At least one class must be selected";
    return newErrors;
  };

  const handleSubmit = async () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const selectedClassIds = formData.classroom_ids.map((c) => c.value);
    const payload = {
      name: formData.name,
      classroom_ids: selectedClassIds,
      school: school.id,
      id: formData.id,
    };

    try {
      setLoading(true);
      setDisableModalClose(true);
        await axiosInstance.post(`${api}subjects/`, payload);
    
      setLoading(false);
      toast.success("Subject created successfully ✅", {
        autoClose: 2000,
        onClose: () => {
          setDisableModalClose(false);
          if (onSave) onSave(payload);
          if (onHide) onHide();
        },
      });
    } catch (error) {
      setLoading(false);
      setDisableModalClose(false);
      const errorMsg =
        error.response?.data?.detail ||
        error.response?.data?.name?.[0] ||
        error.response?.data?.s?.[0] ||
        "Failed to save subject ❌";

      toast.error(errorMsg, {
        autoClose: 2500,
      });
    }
  };

  if (loading) return <Loader />;

  return (
    <Modal
      show={show}
      onHide={() => {
        if (!disableModalClose) onHide();
      }}
      backdrop={disableModalClose ? "static" : true}
      centered
    >
      <Modal.Header closeButton={!disableModalClose}>
        <Modal.Title>{subject ? "Edit Subject" : "Add Subject"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Subject Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter subject name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              isInvalid={!!errors.name}
              disabled={disableModalClose}
            />
            <Form.Control.Feedback type="invalid">
              {errors.name}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Associate Classes</Form.Label>
            <Select
              isMulti
              options={classData}
              value={formData.classroom_ids}
              onChange={(selected) => {
                setFormData({ ...formData, classroom_ids: selected });
                setErrors((prev) => ({ ...prev, classes: "" }));
              }}
              isDisabled={disableModalClose}
              classNamePrefix="select"
              placeholder="Select one or more classes"
            />
            {errors.classes && (
              <div className="text-danger mt-1">{errors.classes}</div>
            )}
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide} disabled={disableModalClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit} disabled={disableModalClose}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SubjectFormModal;
