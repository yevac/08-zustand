import css from "./SidebarNotes.module.css";
import Link from "next/link";
import TAGS from "@/constants/noteTags";

function SidebarNotes()  {
  return (
    <ul className={css.menuList}>
      <li className={css.menuItem}>
        <Link href={`/notes/filter/all`} className={css.menuLink}>
          All notes
        </Link>
      </li>
      {TAGS.map((tag) => {
        return (
          <li className={css.menuItem} key={tag}>
            <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
              {tag}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default SidebarNotes;