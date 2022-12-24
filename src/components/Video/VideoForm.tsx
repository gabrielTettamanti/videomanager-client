import React, { FormEvent, ChangeEvent, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import * as VideoServices from "./VideoServices";
import { Video } from "./Video";

type InputChange = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

const VideoForm = () => {

    const navigate = useNavigate();
    const params = useParams();

    const [video, setVideo] = useState<Video>({title:'', description:'', url: ''});

    const handleInputChange = (e: InputChange) => {
        setVideo({...video, [e.target.name]: e.target.value})
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!params.id){
          await VideoServices.createVideo(video);
          toast.success('New video added');
        }else{
          await VideoServices.updateVideo(params.id, video)
          toast.success('Video updated');
        }

        navigate('/');
    };

    const getVideo = async (id: string) => {
      const res = await VideoServices.getVideo(id);
      const { title, description, url } = res.data;
      setVideo({title, description, url});
    }

    useEffect(() => {
      if (params.id) getVideo(params.id);
    }, [])

  return (
    <div className="row">
      <div className="col-md-4 offset-md-4">
        <div className="card">
          <div className="card-body">
            <h3>New video</h3>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  name="title"
                  placeholder="Write a title for this video"
                  className="form-control"
                  onChange={handleInputChange}
                  value={video.title}
                  autoFocus
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="url"
                  placeholder="https://somesite.com"
                  className="form-control"
                  onChange={handleInputChange}
                  value={video.url}
                />
              </div>
              <div className="form-group">
                <textarea
                  name="description"
                  rows={3}
                  className="form-control"
                  placeholder="Write a description"
                  onChange={handleInputChange}
                  value={video.description}
                ></textarea>
              </div>
              {
                params.id ?
                <button className="btn btn-info">Update video</button>
                :
                <button className="btn btn-primary">Create video</button>
              }
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoForm;
