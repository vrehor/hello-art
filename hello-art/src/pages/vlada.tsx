import React, {useState} from "react";
import {useForm} from "react-hook-form";

const Vlada = () => {
    const {register, handleSubmit} = useForm();
    const [image, setImage] = useState<string | null>(null);

    // @ts-ignore
    const onSubmit = async (data) => {

        const formData = new FormData();
        formData.append("personImage", data.personImage[0]);
        formData.append("midjourneyImage", data.midjourneyImage[0]);

        try {
            const response = await fetch('/api/magic', {
                method: 'POST',
                cache: "no-cache",
                body: formData,
            })

            // Handle response if necessary
            setImage(await response.text())
            // ...
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <>
            {image && <img alt="Generated image" src={image} className="h-1/3 w-1/3"/>}
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="file" {...register("personImage")} />
                <input type="file" {...register("midjourneyImage")} />

                <input type="submit"/>
            </form>
        </>

    )
}

export default Vlada
