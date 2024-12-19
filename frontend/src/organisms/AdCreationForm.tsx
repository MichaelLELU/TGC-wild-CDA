import { useEffect, type FormEvent } from "react";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import {
  type AdInput,
  useCreateAdMutation,
  useGetCategoriesAndTagsQuery,
} from "../libs/graphql/generated/graphql-types";

export default function AdCreationForm() {
  const { loading, error, data } = useGetCategoriesAndTagsQuery();
  const [createAd, { data: dataSub, loading: subLoading, error: subError }] =
    useCreateAdMutation();

  const navigate = useNavigate();

  const hSubmit = (evt: FormEvent) => {
    evt.preventDefault();

    const form = evt.target;
    const formData = new FormData(form as HTMLFormElement);
    const formJson = Object.fromEntries(formData.entries());

    const formattedData = {
      ...formJson,
      price: Number.parseFloat(formJson.price as string),
      tags: (formJson.tags as string).split(","),
    };

    createAd({ variables: { data: formattedData as AdInput } });
  };

  useEffect(() => {
    if (!dataSub) return;
    navigate(`/ads/${dataSub.createAd.id}`);
  }, [dataSub, navigate]);

  if (error || subError) return <>Error!</>;
  if (loading) return <>Loading...</>;
  if (!data) return <>We couldn't find anything to display</>;
  return (
    <main className="main-content">
      <form onSubmit={hSubmit}>
        <label>
          Titre:
          <input className="text-field" name="title" />
        </label>
        <label>
          Description:
          <input className="text-field" name="description" />
        </label>
        <label>
          Owner:
          <input className="text-field" name="owner" />
        </label>
        <label>
          Price:
          <input className="text-field" name="price" type="number" />
        </label>
        <label>
          Picture:
          <input className="text-field" name="picture" />
        </label>
        <label>
          Location:
          <input className="text-field" name="location" />
        </label>
        <select name="category">
          <option value="-">Categories</option>
          {data.getCategories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <label>
          Tags:
          <Select
            options={data.getTags.map((apiTag: ApiTag) => ({
              value: apiTag.id,
              label: apiTag.name,
            }))}
            isMulti
            name="tags"
            delimiter=","
          />
        </label>
        <button type="submit" className="button" disabled={subLoading}>
          Create Ad!
        </button>
      </form>
    </main>
  );
}
