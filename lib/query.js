export async function getNotionQueryData() {
  const url =
    "https://api.notion.com/v1/databases/26246846-1562-467a-9443-904ee63ad154/query";
  const body = {
    filter: {
      property: "发布日期",
      date: {
        on_or_after: "2021-01-01T00:00:00.000Z",
      },
    },
  };
  let data;
  const result = await fetch(url, {
    body: JSON.stringify(body),
    headers: new Headers({
      "Content-Type": "application/json",
      Authorization:
        "Bearer secret_JkxlrFsIPT2O81IbBMaxqV01E43p8M0DcZ3fttGIQkV",
    }),
    method: "POST",
  });

  data = await result.json();
  return data && data["results"] ? data["results"] : [];
}
