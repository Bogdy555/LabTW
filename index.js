const XType = 1;
const OType = 2;
const NullType = 0;

let CurrentPlayer = XType;

let DomData = new Array(3);
let Type = new Array(3);

for (let Row = 0; Row < 3; Row++)
{
	DomData[Row] = new Array(3).fill(null);
	Type[Row] = new Array(3).fill(NullType);
}

function Solved()
{
	for (let _Line = 0; _Line < 3; _Line++)
	{
		if (Type[_Line][0] == Type[_Line][1] && Type[_Line][1] == Type[_Line][2])
		{
			return Type[_Line][0];
		}
	}

	for (let _Column = 0; _Column < 3; _Column++)
	{
		if (Type[0][_Column] == Type[1][_Column] && Type[1][_Column] == Type[2][_Column])
		{
			return Type[0][_Column];
		}
	}

	if (Type[0][0] == Type[1][1] && Type[1][1] == Type[2][2])
	{
		return Type[1][1];
	}

	if (Type[0][2] == Type[1][1] && Type[1][1] == Type[2][0])
	{
		return Type[1][1];
	}

	return NullType;
}

const OnClick = (Row, Column) =>
{
	Color = null;

	if (CurrentPlayer == XType)
	{
		if (Type[Row][Column] == NullType)
		{
			CurrentPlayer = OType;
			Type[Row][Column] = XType;
			Color = "rgb(230, 0, 230)";
		}
	}
	else if (CurrentPlayer == OType)
	{
		if (Type[Row][Column] == NullType)
		{
			CurrentPlayer = XType;
			Type[Row][Column] = OType;
			Color = "rgb(128, 170, 255)";
		}
	}

	SolvedType = Solved();

	if (SolvedType != NullType)
	{
		for (let _Y = 0; _Y < 3; _Y++)
		{
			for (let _X = 0; _X < 3; _X++)
			{
				Type[_Y][_X] = SolvedType;
				DomData[_Y][_X].style.backgroundColor = Color;
			}
		}
	}
	else
	{
		DomData[Row][Column].style.backgroundColor = Color;
	}
};

const CreateChild = (Row, Column) =>
{
	let Child  = document.createElement("div");
	Child.addEventListener
	(
		"click",
		() =>
		{
			OnClick(Row, Column);
		}
	);

	return Child;
};

document.addEventListener
(
	"DOMContentLoaded",
	() =>
	{
		DomData.forEach
		(
			(RowObj, Row) =>
			{
				RowObj.forEach
				(
					(Element, Column) =>
					{
						let Child = CreateChild(Row, Column);
						document.body.append(Child);
						DomData[Row][Column] = Child;
					}
				);
			}
		);
	}
);
