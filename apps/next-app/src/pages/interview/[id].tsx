import { useParams } from "next/navigation"

export default function InterviewById(){

    const params = useParams();
    console.log(params)

    return(
        <div>
            The id of the Page is .... {params?.id}
        </div>
    )
}