import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

export const dynamic = "force-dynamic";

export async function GET() {
  const connString = process.env.DATABASE_URL;
  if (!connString) {
    return NextResponse.json(
      {
        submissionsByDay: { "1": 0, "2": 0, "3": 0, "4": 0, "5": 0 },
        uniqueSubmitters: 0,
        completedAllFive: 0,
      },
      { status: 200 }
    );
  }

  const sql = neon(connString);

  try {
    const [byDayRows, uniqueResult, completedResult] = await Promise.all([
      sql`
        SELECT exercise_day, COUNT(*)::int as count
        FROM submissions
        GROUP BY exercise_day
      `,
      sql`
        SELECT COUNT(DISTINCT email)::int as count
        FROM submissions
      `,
      sql`
        SELECT COUNT(*)::int as count
        FROM (
          SELECT email
          FROM submissions
          GROUP BY email
          HAVING COUNT(DISTINCT exercise_day) = 5
        ) t
      `,
    ]);

    const submissionsByDay: Record<string, number> = {
      "1": 0,
      "2": 0,
      "3": 0,
      "4": 0,
      "5": 0,
    };
    for (const row of byDayRows) {
      const day = String(row.exercise_day);
      if (day in submissionsByDay) {
        submissionsByDay[day] = Number(row.count);
      }
    }

    const uniqueSubmitters = Number(uniqueResult[0]?.count ?? 0);
    const completedAllFive = Number(completedResult[0]?.count ?? 0);

    return NextResponse.json({
      submissionsByDay,
      uniqueSubmitters,
      completedAllFive,
    });
  } catch (err) {
    console.error("Dashboard stats error:", err);
    return NextResponse.json(
      {
        submissionsByDay: { "1": 0, "2": 0, "3": 0, "4": 0, "5": 0 },
        uniqueSubmitters: 0,
        completedAllFive: 0,
      },
      { status: 200 }
    );
  }
}
