package util;

import com.google.protobuf.ByteString;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.RandomAccessFile;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

public class UploadUtility {
    private String uuid;
    private final String ROOT = "./file_store";

    public void Upload(UUID uuid, int offset, int chunkNumber, long chunkSize, byte[] chunkByte) throws IOException {
        Path chunkDestinationPath = Paths.get(ROOT,uuid.toString());
        if(!Files.exists(chunkDestinationPath)){
            Files.createDirectories(chunkDestinationPath);
        }


        Path path = Paths.get(ROOT,uuid.toString(),Integer.toString(offset));
        RandomAccessFile raf = new RandomAccessFile(path.toString(), "rw");
        //Seek to position
        raf.seek((chunkNumber - 1) * chunkSize);
        raf.write(chunkByte,0,(int)chunkSize);
        raf.close();

    }


}
