Latian dasar GraphQL menggunakan Node JS
Part 2 (Relasi GraphQL)
- Merelasikan data dari 2 array

- Memanggil data jamak tanpa relasi
{
  forums {
    id,
    title,
    desc
  }
}

- memanggil data single tanpa relasi

{
  forum(id:"2") {
    id,
    title
  }
}

- memanggil data single dengan relasi

{
  forum(id:"2") {
    title,
    user{
      id
      name
    }
  }
}

- Memanggil data jamak dengan relasi

{
  user(id:"1") {
    name,
    forums{
      id
      title
    }
  }
}


{
  forums{
    id
    title
    desc
    user{
      id
      name
    }
  }
}

{
  users{
    id
    name
    forums{
      id
      title
      desc
    }
  }
}


Cara menggunakan
- npm install
- npm install nodemon -g
- nodemon app

